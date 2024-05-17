import { Insights } from "../../support/types"
import { Helper } from "../../support/helper";
import { Tag } from "cypress/support/utils"

describe([Tag.REGRESSION, Tag.Insights], "Insights - " + Cypress.env('locale') + " - Desktop", () => {
  let insightList: Insights[]
  let helper = new Helper()
  let insightkeys
  let e2e
  let commonKeys
  let currentPage = 1

  before(() => {
    cy.fixture(`../../locales/${Cypress.env('locale')}/insights.json`).then((json) => { insightkeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
  })

  beforeEach(() => {
    helper.loginUser("port3@mailinator.com", "Pass@123", true)
    helper.VisitUrl(e2e.urlPaths.insights)

  })

  it("should display all categories of insights", () => {
    cy.findAllByText(insightkeys.page.index.heading, { timeout: 20000 }).should('be.visible')
    cy.findAllByText(insightkeys.page.index.description).should('be.visible')
    cy.findAllByText(insightkeys.page.articles.heading).should('be.visible')
    cy.get('h2.chakra-heading').contains(insightkeys.page.webinars.heading)
      .scrollIntoView()
    cy.findAllByText(insightkeys.page.whitepapers.heading, { timeout: 20000 }).should('be.visible')
    cy.get('h2.chakra-heading').contains(insightkeys.page.managementViews.heading).should('be.visible')
    cy.findAllByRole("link", { name: commonKeys.button.seeMore, timeout: 20000 })
      .filter(e2e.Management_view_href).scrollIntoView()
    cy.findAllByText(insightkeys.page.marketUpdates.heading, { timeout: 20000 }).should('be.visible')
  })

  it("should navigate to articles page", () => {
    cy.findAllByRole("link", { name: commonKeys.button.seeMore, timeout: 20000 })
      .filter(e2e.Article_href)
      .click()
    cy.location("pathname").should("equal", e2e.urlPaths.articles)
  })

  it("should navigate back to Insights from articles page", () => {
    helper.VisitUrl(e2e.urlPaths.articles)
    cy.findAllByText(commonKeys.button.back, { timeout: 20000 }).click()
    cy.location("pathname").should("equal", e2e.urlPaths.insights)
  })

  it("should display the details of articles page", () => {
    helper.VisitUrl(e2e.urlPaths.articles)
    cy.findAllByText(insightkeys.page.articles.title, { timeout: 20000 }).should('be.visible')
    cy.findAllByText(insightkeys.page.articles.description).should('be.visible')
    cy.findAllByText(insightkeys.page.articles.heading).should('be.visible')
    cy.findAllByText(insightkeys.page.articles.subheading).should('be.visible')
  })

  it("should display maximum 3 related cards in each insight category ", () =>
    cy.findAllByLabelText("insightContainer", { timeout: 20000 }).each((insightCategory) => {
      let categoryCards = []
      cy.wrap(insightCategory)
        .findAllByLabelText("insightCardType")
        // validate atmost 3 cards are displayed for each category
        .should("have.length.at.most", 3)
        .each((card) => {
          categoryCards.push(card.text())
        })
      // validate all cards are of same category
      expect(categoryCards.every((item) => item === item[0])).to.be.true
    }))

  it("should navigate to detailed screen when user clicks on insight", () => {
    cy.findAllByLabelText("insightCardType", { timeout: 20000 }).eq(0).click()
    cy.location("pathname").should("match", /insights\/(.*)\/(.*)/)

  })

  it("should display pagination for articles", () => {
    helper.VisitUrl(e2e.urlPaths.articles)

    cy.findByLabelText("previousPage", { timeout: 20000 })
      .should("be.disabled")
    cy.findByLabelText("nextPage").scrollIntoView()
    cy.findByLabelText("pagination", { timeout: 30000 }).should('be.visible')
    cy.findByLabelText("nextPage").scrollIntoView().click()
  })

  it("should display information in a card for Articles", () => {
    helper.VisitUrl(e2e.urlPaths.articles)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findAllByLabelText("insightType")
        .should("have.text", insightkeys.tag.Article)

      //cy.wrap(item).findByLabelText("insightPublishDate",{timeout:20000}).should("be.visible")
      cy.wrap(item)
        // title of article
        .findByLabelText("insightTitle")
        .then((title) => {
          // image of article
          cy.wrap(item).scrollIntoView().findByAltText(title.text(), { timeout: 30000 }).should("be.visible")
        })
    })
  })
  it("should not display same Article in related content section", () => {
    helper.VisitUrl(e2e.urlPaths.articles)
    cy.findAllByLabelText("insightCard", { timeout: 9000 }).eq(0).click()
    const currentarticle = cy
      .findAllByRole("heading", { level: 1 })
      .eq(0)
      .its("text")
    cy.findAllByLabelText("insightCard").each((item) => {
      cy.wrap(item)
        .findByLabelText("insightTitle")
        .should("not.contain.text", currentarticle)
    })
  })

  it("should display Breadcrumbs navigation for the page", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findByLabelText("breadcrumb", { timeout: 20000 }).should(
      "have.text",
      `${commonKeys.breadcrumb.insights}/${commonKeys.breadcrumb.webinars}`,
    )
  })

  it("should display heading for webinars", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findByRole("heading", {
      name: insightkeys.page.webinars.heading,
      timeout: 20000
    }).should("be.visible")
  })

  it("should display information in a card for webinar", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findAllByLabelText("insightType")
        .should("have.text", insightkeys.tag.Webinar)

      cy.wrap(item).findByLabelText("insightPublishDate", { timeout: 20000 }).should("be.visible")
      cy.wrap(item)
        // title of webinar
        .findByLabelText("insightTitle")
        .then((title) => {
          // image of webinar
          cy.wrap(item).findByAltText(title.text()).should("be.visible")
        })
    })
  })


  it("should show maximum of 3 webinars on single page", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).should("have.length.at.most", 3)
  })

  it("should navigate back to insights page on clicking Back button", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findByRole("button", { name: commonKeys.button.back, timeout: 20000 }).click()
    cy.location("pathname").should("equal", e2e.urlPaths.insights)
  })

  it("should be landed on the detailed page of the particular webinar", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()
    cy.location("pathname").should("match", /insights\/webinars\/*/)
  })

  it("should display video of webinar", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 9000 }).eq(0).click()
    cy.findByLabelText("video", { timeout: 9000 }).should("be.visible")
  })

  it("should display list of guest speakers", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 9000 }).eq(0).click()
    cy.findAllByLabelText("guests", { timeout: 20000 }).should("have.lengthOf.at.least", 1)
  })

  it("should display maximum 3 related webinars ", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 20000 })
      .should("have.length.at.most", 3)
      .each((item) => {
        cy.wrap(item).findByText(insightkeys.tag.Webinar).should("be.visible")
      })
  })

  it("should not display same webinar in related content section", () => {
    helper.VisitUrl(e2e.urlPaths.webinars)
    cy.findAllByLabelText("insightCard", { timeout: 9000 }).eq(0).click()
    const currentwebinar = cy
      .findAllByRole("heading", { level: 2 })
      .eq(0)
      .its("text")
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findByLabelText("insightTitle")
        .should("not.contain.text", currentwebinar)
    })
  })

  it("should display Breadcrumbs navigation for the page", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findByLabelText("breadcrumb", { timeout: 20000 }).should(
      "have.text",
      `${commonKeys.breadcrumb.insights}/${commonKeys.breadcrumb.whitepapers}`,
    )
  })

  it("should display heading for whitepapers", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findByRole("heading", {
      name: insightkeys.page.whitepapers.heading,
      timeout: 20000
    }).should("be.visible")
  })

  it("should display information in a card for whitepaper", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findAllByLabelText("insightType")
        .should("have.text", insightkeys.tag.Whitepaper)
      cy.wrap(item).findByLabelText("insightPublishDate").should("be.visible")
      cy.wrap(item)
        // title of whitepaper
        .findByLabelText("insightTitle")
        .then((title) => {
          // image of whitepaper
          cy.wrap(item).findByAltText(title.text()).should("be.visible")
        })
    })
  })

  it("should be landed on the detailed page of the particular whitepaper", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findAllByLabelText("insightCard", { timeout: 8000 }).eq(0).click()
    cy.location("pathname").should("match", /insights\/whitepapers\/*/)
  })

  it("should display CTA to download whitepaper", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findAllByLabelText("insightCard", { timeout: 8000 }).eq(0).click()
    cy.findByRole("button", {
      name: commonKeys.button.downloadWhitepaper,
    }).should("be.visible")
  })

  it("should display maximum 3 related whitepapers ", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findAllByLabelText("insightCard", { timeout: 20000 })
      .should("have.length.at.most", 3)
      .each((item) => {
        cy.wrap(item)
          .findByText(insightkeys.tag.Whitepaper)
          .should("be.visible")
      })
  })

  it("should not display same whitepaper in related content section", () => {
    helper.VisitUrl(e2e.urlPaths.whitepapers)
    cy.findAllByLabelText("insightCard", { timeout: 8000 }).eq(0).click()
    const currentwhitepaper = cy
      .findAllByRole("heading", { level: 2 })
      .eq(0)
      .its("text")
    cy.findAllByLabelText("insightCard").each((item) => {
      cy.wrap(item)
        .findByLabelText("insightTitle")
        .should("not.contain.text", currentwhitepaper)
    })
  })

  it("should view the entire list of management views", () => {
    helper.VisitUrl(e2e.urlPaths.insights)
    cy.findAllByRole("link", { name: commonKeys.button.seeMore, timeout: 20000 })
      .filter(e2e.Management_view_href).eq(1)
      .click()
    cy.location("pathname").should("equal", e2e.urlPaths.insights)
  })

  it("should display Breadcrumbs navigation for the page", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findByLabelText("breadcrumb", { timeout: 20000 }).should(
      "have.text",
      `${commonKeys.breadcrumb.insights}/${commonKeys.breadcrumb["management-views"]}`,
    )
  })

  it("should display heading for management views", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findByRole("heading", {
      name: insightkeys.page.managementViews.heading,
      timeout: 20000
    }).should("be.visible")
  })

  it("should display information in a card for Management View", function () {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).each(function (item) {
      // cy.wrap(item).findByLabelText("insightPublishDate").should("be.visible")
      cy.wrap(item)
        // title of Management View
        .findByLabelText("insightTitle")
        .then((title) => {
          // image of Management View
          cy.wrap(item).scrollIntoView().findByAltText(title.text()).should("be.visible")
        })
    })
  })

  it("should not display pagination when there are less than 10 managementViews", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findByLabelText("pagination", { timeout: 20000 }).should("not.exist")
  })

  it("should navigate back to insights page on clicking Back button", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findByRole("button", { name: commonKeys.button.back, timeout: 20000 }).click()
    cy.location("pathname").should("equal", e2e.urlPaths.insights)
  })

  it("should be landed on the detailed page of the particular Management View", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()
    cy.location("pathname").should("match", /insights\/management-views\/*/)
    cy.intercept('pagead/id').as('gettrack')
    cy.wait('@gettrack')
    cy.get("iframe").then(($frame) => {
      expect($frame.attr("src")).to.contains("www.youtube.com")
    })
  })

  it("should display maximum 3 related management views ", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()
    cy.findAllByLabelText("insightCard")
      .should("have.length.at.most", 3)
      .each((item) => {
        cy.wrap(item)
          .findByText(insightkeys.tag.ManagementView)
          .should("be.visible")
      })
  })

  it("should not display same Management View in related content section", () => {
    helper.VisitUrl(e2e.urlPaths.management_view)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()
    const currentManagementView = cy
      .findAllByRole("heading", { level: 2 })
      .eq(0)
      .its("text")
    cy.findAllByLabelText("insightCard").each((item) => {
      cy.wrap(item)
        .findByLabelText("insightTitle")
        .should("not.contain.text", currentManagementView)
    })
  })

  it("should view the entire list of monthly market updates", () => {

    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.location("pathname", { timeout: 20000 }).should(
      "equal",
      e2e.urlPaths.monthly_Market,
    )
  })

  it("should display Breadcrumbs navigation for the page", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findByLabelText("breadcrumb", { timeout: 9000 }).should(
      "have.text",
      `${commonKeys.breadcrumb.insights}/${commonKeys.breadcrumb["market-updates"]}`,
    )
  })

  it("should display heading for Monthly Market Updates", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findByRole("heading", {
      name: insightkeys.page.marketUpdates.heading,
      timeout: 20000
    }).should("be.visible")
  })

  it("should display information in a card for Monthly Market Updates", function () {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).each(function (item) {
      cy.wrap(item).findByLabelText("insightPublishDate", { timeout: 20000 }).should("be.visible")
      cy.wrap(item)
        // title of Monthly Market Updates
        .findByLabelText("insightTitle")
        .then((title) => {
          // image of Monthly Market Updates
          cy.wrap(item).findByAltText(title.text()).should("be.visible")
        })
    })
  })


  it("should show maximum of 10 monthly Market Updates on single page", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).should("have.length.at.most", 10)
  })


  it("should navigate back to insights page on clicking Back button", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findByRole("button", { name: commonKeys.button.back, timeout: 20000 }).click()

    cy.location("pathname").should("equal", e2e.urlPaths.insights)
  })

  it("should be landed on the detailed page of the particular Monthly Market Updates", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)

    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()

    cy.location("pathname").should(
      "match",
      /insights\/market-updates\/*/,
    )
  })

  it("should keep all accordion closed by default for content", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()
    cy.findAllByLabelText("content", { timeout: 20000 }).each((item) => {
      cy.wrap(item)
        .findByRole("button")
        .should("have.attr", "aria-expanded", "false")
    })
  })

  it("should display maximum 3 related Monthly Market Updates ", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findAllByLabelText("insightCard", { timeout: 20000 })
      .should("have.length.at.most", 3)
      .each((item) => {
        cy.wrap(item)
          .findByText(insightkeys.tag.MarketUpdate)
          .should("be.visible")
      })
  })

  it("should not display same Monthly Market Updates in related content section", () => {
    helper.VisitUrl(e2e.urlPaths.monthly_Market)
    cy.findAllByLabelText("insightCard", { timeout: 20000 }).eq(0).click()
    const currentMonthlyMarketUpdate = cy
      .findAllByRole("heading", { level: 2, timeout: 20000 })
      .eq(0)
      .its("text")
    cy.findAllByLabelText("insightCard").each((item) => {
      cy.wrap(item)
        .findByLabelText("insightTitle")
        .should("not.contain.text", currentMonthlyMarketUpdate)
    })
  })

})




