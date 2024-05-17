import { Opportunity } from "../../support/types"
import { Helper } from "../../support/helper";
import { Tag } from "cypress/support/utils"

let opportunitiesKeys
let commonKeys
let proposalKeys
let e2e

describe([Tag.REGRESSION, Tag.UnlockedOpportunities], "UnlockedOpportunities - " + Cypress.env('locale') + " - Desktop", () => {
  let opportunities: Opportunity[]
  let helper = new Helper()
  before(() => {
    cy.fixture(`../../locales/${Cypress.env('locale')}/opportunities.json`).then((json) => { opportunitiesKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/proposal.json`).then((json) => { proposalKeys = json })
  })
  beforeEach(() => {
    helper.loginUser("testd@mailinator.com", "Pass@123", true)
    cy.intercept("/api/portfolio/opportunities").as("portfolioOpportunities")

    cy.visit(e2e.urlPaths.opportunities)

    cy.wait("@portfolioOpportunities",{timeout: 20000})
      .its("response.body")
      .then(($body) => {
        opportunities = $body.opportunities
      })
  })


  it("should display Qualify to Unlock CTA", () => {
    cy.findAllByText(opportunitiesKeys.index.button.qualify, { timeout: 20000 }).should(
      "have.length",
      2,
    )
    cy.findByText(opportunitiesKeys.unlock.heading, { timeout: 20000 })
  })

  it("should see all sanitized opportunities offered by TFO", () => {
    cy.findAllByLabelText("opportunityCard", { timeout: 20000 }).should(
      "have.length",
      opportunities.length,
    )
  })

  it("should see expected return as confidential for a a non-qualified investor who has not completed the investment profile section yet", () => {
    cy.findAllByText(opportunitiesKeys.index.text.confidential, { timeout: 20000 }).should(
      "have.length",
      opportunities.length,
    )
  })

  it("should display Sharia'h tag for opportunities with Shariah compliance", () => {
    var shariahCount = 0

    for (let i = 0; i < 2; i++) {
      cy.findAllByLabelText("opportunityCard", { timeout: 20000 })
        .eq(i)
        .then((item) => {
          if (shariahCount > 0) {
            if (opportunities[i].isShariahCompliant) {
              cy.wrap(item)
                .findByLabelText("title")
                .siblings("svg")
                .should("be.visible")
            }
          }
        })
    }
  })

  it("should be able to initiate the investment profile section to unlock opportunities from Qualify to unlock CTA", () => {

    cy.findAllByText(opportunitiesKeys.index.button.qualify, { timeout: 20000 }).eq(0).click()
    cy.location("pathname").should("contains", e2e.urlPaths.unlock_opportunity, { timeout: 20000 })
  })

  it("should be able to initiate the investment profile section to unlock opportunities", () => {


    cy.get("#cardOverlay", { timeout: 20000 }).eq(0).invoke("show")

    cy.findByRole("button", { name: opportunitiesKeys.overlay.cta, timeout: 20000 }).click()

    cy.location("pathname").should("equal", e2e.urlPaths.unlock_opportunity)
  })

  it("should be able to start investment profile", () => {
    helper.VisitUrl(e2e.urlPaths.unlock_opportunity)
    cy.findAllByRole("radio", { timeout: 20000 }).eq(0).parent("label").click()
    cy.findByRole("button", {
      name: opportunitiesKeys.unlock.button.getStarted,
    }).click()
    cy.location("pathname").should(
      "equal",
      e2e.urlPaths.investor_profile,
      { timeout: 20000 }
    )
  })

  it("should display step name in navigation bar", () => {
    helper.VisitUrl(e2e.urlPaths.investor_profile)
    cy.get("header", { timeout: 20000 }).findByText(
      proposalKeys.chapterSelection.chapterOne.stepper.title,
    )
  })

  it("should be redirected to dashboard screen on Save & Exit from Q1", () => {
    helper.VisitUrl(e2e.urlPaths.investor_profile)
    cy.get("header", { timeout: 20000 }).findByText(
      proposalKeys.chapterSelection.chapterOne.stepper.title,
    )
    cy.findByRole("button", { name: commonKeys.button.saveAndExit }).click()
    cy.findByRole("link", { name: commonKeys.button.saveAndExit }).click()
    cy.location("pathname").should("equal", e2e.urlPaths.dashboard)
  })

  it("should have truncated title of card after 1 line", () => {
    cy.findAllByLabelText("opportunityCard", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findByLabelText("title", { timeout: 20000 })
        .should("have.css", "webkit-line-clamp", "1")
        .should("have.css", "text-overflow", "ellipsis")
    })
  })

  it("should have truncated summary of card after 2 line", () => {
    cy.findAllByLabelText("opportunityCard", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findByLabelText("description", { timeout: 20000 })
        .should("have.css", "webkit-line-clamp", "2")
        .should("have.css", "text-overflow", "ellipsis")
    })
  })

  it("should not display CTA to Unlock sanitized opportunities for a disqualified investor", () => {

    cy.findAllByRole("link", {
      name: opportunitiesKeys.index.button.unlock,
      timeout: 20000
    }).should("not.exist")
  })
})