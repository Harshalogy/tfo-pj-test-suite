import { SimulatedPortfolio, User } from "cypress/support/types"
import formatCurrency from "../../support/formatCurrency"
import formatPercentage from "../../support/formatPercentage"
import formatYearName from "../../support/formatYearName"
import { Helper } from "../../support/helper";
import { Tag } from "cypress/support/utils"

let selectedYears: string
let selectedRiskFilter: string
let simulatorKeys
let commonKeys
let minimumInvestmentAmount = "$300,000"
let maximumInvestmentAmount = "$20,000,000"
let e2e

describe([Tag.REGRESSION, Tag.Simulator], "Simulator - " + Cypress.env('locale') + " - Desktop", () => {
  let helper = new Helper()
  let user: User
  let simulatorJson: SimulatedPortfolio
  before(() => {
    cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/simulator.json`).then((json) => { simulatorKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
    cy.intercept("/api/user").as("user")
    cy.intercept("/api/portfolio/simulator").as("simulator")
  })

  beforeEach(() => {
    helper.loginUser("port3@mailinator.com", "Pass@123", true)
    cy.visit(e2e.urlPaths.portfolio_Simulator, { timeout: 20000 })
  })

  it("should show default investment amount as $300,000", () => {
    // cy.visit(e2e.urlPaths.portfolio_Simulator, { timeout: 20000 })
    cy.wait("@user", { timeout: 25000 }).then((interception) => {
      user = JSON.parse(JSON.stringify(interception.response.body))
      cy.findByPlaceholderText(
        simulatorKeys.controls.input.investmentAmount.placeholder,
        { timeout: 20000 }
      ).should("have.value", "300,000")
    })
  })

  it("should display tooltip about Investment amount", () => {
    let tooltipText: string =
      simulatorKeys.controls.input.investmentAmount.tooltip
    tooltipText = tooltipText.replace(
      "{{minInvestmentAmount}}",
      minimumInvestmentAmount,
    )
    cy.findAllByLabelText("Info icon", { timeout: 20000 }).eq(0).trigger("mouseover")
    cy.findByText(tooltipText).should('be.visible')
    cy.findAllByLabelText("Info icon").eq(0).trigger("mouseleave")
  })

  it("should show default Time Horizon as 10 years", () => {
    cy.findByLabelText("Time horizon slider", { timeout: 20000 })
      .find("p")
      .should("have.text", e2e.tenthyear)
  })

  it("should display tooltip about Shariah Compliance", () => {
    cy.findAllByLabelText("Info icon", { timeout: 20000 }).eq(1).trigger("mouseover")
    cy.wait(1000)
    let tooltipText: string =
      simulatorKeys.controls.input.investmentAmount.tooltip
    tooltipText = tooltipText.replace(
      "{{minInvestmentAmount}}",
      minimumInvestmentAmount,
    )
    cy.findByText(tooltipText)
    cy.findAllByLabelText("Info icon").eq(1).trigger("mouseleave")
  })
  it("should able to select Risk Tolerence", () => {
    for (var i = 1; i < 6; i++) {
      cy.findByText(
        e2e.riskTolerance.level[i].name,
        {
          timeout: 20000
        }).click()
    }
  })

  it("should simulate portfolio", () => {
    cy.intercept("/api/portfolio/simulator", (request) => {
      if (request.body.timeHorizonInYears === 11) {
        request.alias = "modifiedSimulator"
      } else {
        request.alias = "simulator"
      }
    })

    cy.findByPlaceholderText(
      simulatorKeys.controls.input.investmentAmount.placeholder,
      { timeout: 20000 }
    )
      .clear()
      .type("4000000{enter}")

    cy.wait("@simulator")



    helper.FlowAPI(e2e.Value)
    cy.wait("@simulator")



    cy.findByRole("button", {
      name: simulatorKeys.controls.slider.riskTolerance.level[3].name,
    }).click()

    cy.wait("@simulator")


    cy.wait("@modifiedSimulator").then(({ request, response }) => {
      cy.wrap(request.body["timeHorizonInYears"]).should("equal", 11)
      simulatorJson = JSON.parse(JSON.stringify(response.body))
    })
  })

  it("should display Time Horizon selected in Your Projections pane", () => {
    cy.intercept("/api/portfolio/simulator", (request) => {
      if (request.body.timeHorizonInYears === 11) {
        request.alias = "modifiedSimulator"
      } else {
        request.alias = "simulator"
      }
    })

    helper.FlowAPI(e2e.Value)
    cy.wait("@simulator", { timeout: 20000 })
    cy.wait("@modifiedSimulator").then(({ request, response }) => {
      cy.wrap(request.body["timeHorizonInYears"]).should("equal", 11)
      simulatorJson = JSON.parse(JSON.stringify(response.body))
    })
    cy.findByLabelText("Time horizon slider")
      .find("p")
      .then(($selectedTimeHorizon) => {
        const selectedYears = $selectedTimeHorizon.text().split(" ")[0]
        let projectionSummary: string = simulatorKeys.projections.summary
        projectionSummary = projectionSummary.replace(/  /g, " ")
        projectionSummary = projectionSummary.replace(/<\d>/g, "")
        projectionSummary = projectionSummary.replace(/<\/\d>/g, "")
        projectionSummary = projectionSummary.replace(
          "{{firstName}}",
          user.profile.firstName,
        )
        projectionSummary = projectionSummary.replace(
          /{{years}}/g,
          selectedYears,
        )
        projectionSummary = projectionSummary.replace(
          "{{yearsText}}",
          formatYearName(simulatorJson.graphData.length - 1, e2e.locale),
        )
        projectionSummary = projectionSummary.replace(
          "{{projectedValue}}",
          formatCurrency(
            simulatorJson.graphData.at(Number(selectedYears)).portfolioValue,
          ),
        )
        projectionSummary = projectionSummary.replace(
          "{{averageIncome}}",
          formatCurrency(simulatorJson.averageIncome),
        )
        projectionSummary = projectionSummary.replace(
          "{{cumulativeYieldPaidOut}}",
          formatCurrency(
            simulatorJson.graphData.at(-1)?.cumulativeYieldPaidOut || 0,
          ),
        )
        projectionSummary = projectionSummary.replace(
          "{{roi}}",
          formatPercentage(simulatorJson.roi),
        )
        projectionSummary = projectionSummary.replace(
          "{{expectedReturn}}",
          formatPercentage(simulatorJson.expectedReturn),
        )
        projectionSummary = projectionSummary.replace(
          "{{expectedYield}}",
          formatPercentage(simulatorJson.expectedYield),
        )
        cy.contains(e2e.summary, { timeout: 20000 })
        cy.contains(projectionSummary.split("<2/>")[2])
      })
  })

  it("should display cumulative payout yield in Projections chart", () => {
    cy.findByText(
      simulatorKeys.legends.cumulativeYieldPaidOut,
      { timeout: 20000 }
    ).scrollIntoView()
    cy.findByText(simulatorKeys.legends.cumulativeYieldPaidOut).should(
      "be.visible",
    )
  })

  it("should display Portfolio Value in Projections chart", () => {
    cy.findByText(simulatorKeys.legends.portfolioValue, { timeout: 20000 }).scrollIntoView()
    cy.findByText(simulatorKeys.legends.portfolioValue).should("be.visible")
  })

  it("should display Allocations distribution categories", () => {
    for (var i = 0; i < simulatorJson.allocations.length; i++) {
      const categoryName = simulatorJson.allocations[i].categorization
      const categoryPercentage = Math.floor(
        simulatorJson.allocations[i].percentage * 100,
      )

      let sampleDeals = simulatorJson.allocations[i].sampleDeals
      let assetClassList = []

      for (let j = 0; j < sampleDeals.length; j++) {
        assetClassList.push(sampleDeals[j].assetClass)
      }

      const assetClasses = Array.from(new Set(assetClassList)).join("  |  ")

      cy.findAllByLabelText("allocationCategory", { timeout: 20000 }).then(($categoryElement) => {
        const text = $categoryElement.text()
        expect(text)
          .to//.contain(categoryName)
          .contain(`${categoryPercentage}%`)
          .contain(assetClasses)
      })
    }
  })

  it("should able to simulate portfolio without Shariah compliance", () => {
    cy.intercept("/api/portfolio/simulator").as("simulator")
    cy.findByText(
      simulatorKeys.controls.checkbox.shariahCompliant.label,
    ).click()


    cy.wait("@simulator").its("response.statusCode").should("eq", 200)
  })

  it("should display error on entering investment amount less than $300,000", () => {
    let minimumAmountAllowed: string =
      simulatorKeys.controls.input.investmentAmount.minHint

    cy.findByPlaceholderText(
      simulatorKeys.controls.input.investmentAmount.placeholder,
    )
      .clear()
      .type("29000{enter}", { force: true })
    cy.findByPlaceholderText(
      simulatorKeys.controls.input.investmentAmount.placeholder,
      { timeout: 9000 }
    ).scrollIntoView()
    cy.findByText(
      minimumAmountAllowed
        .replace("{{minInvestmentAmount}}", minimumInvestmentAmount)
    ).should("be.visible", { timeout: 10000 })


  })

  it("should display error on entering investment amount more than $20,000,000", () => {
    cy.findByPlaceholderText(
      simulatorKeys.controls.input.investmentAmount.placeholder,
    )
      .clear()
      .type("29000000{enter}")
    cy.findByPlaceholderText(
      simulatorKeys.controls.input.investmentAmount.placeholder,
    ).scrollIntoView()

    let maximumAmountAllowed: string =
      simulatorKeys.controls.input.investmentAmount.maxHint

    cy.findByText(
      maximumAmountAllowed
        .replace("{{maxInvestmentAmount}}", maximumInvestmentAmount),
    ).should("be.visible", { timeout: 20000 })
  })

  it("should display error on not entering investment amount", () => {
    helper.GetSpinner()
    cy.findByPlaceholderText(
      simulatorKeys.controls.input.investmentAmount.placeholder,
    ).clear()
    cy.findByRole("button", {
      name: simulatorKeys.controls.slider.riskTolerance.level[3].name,
    }).click()

    cy.contains(commonKeys.errors.required).should("be.visible", { timeout: 20000 })
  })

  it("should be navigated to preproposal screen when unlock opportunity flow is not completed", () => {
    cy.get(e2e.startInvesting, { timeout: 20000 })
      .click()

    cy.location("pathname", { timeout: 20000 }).should("equal", e2e.urlPaths.proposal)
  })

  it("should able to Exit from Simulator screen", () => {
    cy.intercept("/v2/track").as("track")
    cy.findByLabelText("Close simulator modal", { timeout: 20000 }).click()
    cy.wait("@track", { timeout: 20000 })
    cy.location("pathname").should("equal", e2e.urlPaths.dashboard, { timeout: 25000 })
  })
})