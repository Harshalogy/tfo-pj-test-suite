import { RelationshipManager, User } from "../../support/types"
import { Helper } from "../../support/helper";
import { Tag } from "cypress/support/utils"
let commonKeys
let profileKeys
let homeKeys
let e2e
let relationshipManager: RelationshipManager
let helper = new Helper()
describe([Tag.REGRESSION, Tag.Profile], "Profile - " + Cypress.env('locale') + " - Desktop", () => {
  let user: User
  before(() => {
    cy.fixture(`../../locales/${Cypress.env('locale')}/profile.json`).then((json) => { profileKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/home.json`).then((json) => { homeKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
    cy.intercept("/api/user").as("user")
  })

  beforeEach(() => {
    helper.loginUser("port3@mailinator.com", "Pass@123", true)
  })

  it("should able to navigate to profile screen", () => {
    cy.visit(e2e.urlPaths.dashboard)
    cy.wait("@user", { timeout: 25000 }).then(({ response }) => {
      user = JSON.parse(JSON.stringify(response.body))
      cy.findByRole("button", { name: user.profile.firstName, timeout: 20000 }).click()
      cy.findByText(commonKeys.nav.links.profile).click({ force: true })
      cy.location("pathname", { timeout: 5000 }).should("equal", e2e.urlPaths.profile)
    })

  })

  it("should not able to edit first name", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByText(profileKeys.tabs.personal.fields.label.firstName, { timeout: 20000 })
      .siblings("input")
      .should("be.disabled")
  })

  it("should fill first name by default", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByText(profileKeys.tabs.personal.fields.label.firstName, { timeout: 20000 })
      .siblings("input")
      .should("have.value", user.profile.firstName)
  })

  it("should not able to edit last name", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByText(profileKeys.tabs.personal.fields.label.lastName, { timeout: 20000 })
      .siblings("input")
      .should("be.disabled")
  })

  it("should fill last name by default", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByText(profileKeys.tabs.personal.fields.label.lastName, { timeout: 20000 })
      .siblings("input")
      .should("have.value", user.profile.lastName)
  })

  it("should not able to edit Personal Email", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByText(profileKeys.tabs.personal.fields.label.email, { timeout: 20000 })
      .siblings("input")
      .should("be.disabled")
  })

  it("should fill Personal Email by default", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByText(profileKeys.tabs.personal.fields.label.email, { timeout: 20000 })
      .siblings("input")
      .should("have.value", user.email)
  })

  it("should be able to edit Personal Phone Number", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByLabelText("phoneCountryCode", { timeout: 20000 })
      .children("div")
      .children("div")
      .should("have.attr", "data-disabled", "true")
    cy.get('#phoneNumber').should('be.disabled')
  })

  it("should fill Personal Phone Number by default", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByLabelText("phoneCountryCode").should(
      "contain.text",
      user.profile.phoneCountryCode,
    )
    cy.get('#phoneNumber', { timeout: 20000 }).should(
      'be.visible'
    )
  })


  it("should able to navigate back from profile screen using Back button", () => {
    helper.VisitUrl(e2e.urlPaths.dashboard)
    cy.findByRole("button", { name: user.profile.firstName, timeout: 20000 }).click()
    cy.findByText(commonKeys.nav.links.profile).click({ force: true })
    cy.location("pathname", { timeout: 50000 }).should("equal", e2e.urlPaths.profile)
    cy.findByRole("button", { name: commonKeys.button.back }).click()
    cy.location("pathname", { timeout: 50000 }).should("equal", e2e.urlPaths.dashboard)
  })

  it("should able to navigate to preferences tab", () => {
    helper.VisitUrl(e2e.urlPaths.profile,)
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name }).click()
  })

  it("should be able to close change password window", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name, timeout: 20000 }).click()
    cy.findByRole("button", {
      name: profileKeys.changePassword.button.change,
    }).click()
    cy.get('.chakra-modal__close-btn').click()
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name, timeout: 20000 }).should(
      "be.visible",
    )
  })

  it("should see the language used while signed up as the default language being set as the preference", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name }).click()
    cy.findByRole("button", {
      name: profileKeys.tabs.preferences.button.applyChanges,
      timeout: 20000
    }).should("be.visible")
    cy.findAllByRole("group")
      .eq(0)
      .then(($element) => {
        expect($element.text()).to.equal(e2e.second_language)
      })
  })

  it("should see the language preferences that are available as English and Arabic in a drop down list", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name }).click()
    cy.wait(4000)
    cy.findAllByRole("group", { timeout: 20000 }).eq(0).click()
    const languagePreferances = ["English", "Arabic"]
    cy.findAllByRole("group")
      .eq(0)
      .findAllByRole("button")

      .should("have.length", 2)
      .each(($el) => {
        expect(languagePreferances).to.include($el.text())
      })
  })

  it("should able to change language preferance from English to Arabic in real time", () => {
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name }).click()
    cy.wait(4000)

    cy.findAllByRole("group", { timeout: 20000 }).eq(0).click()
    cy.findAllByRole("group")
      .eq(0)
      .findByText("Arabic").click({ force: true })

    cy.findByRole("button", {
      name: profileKeys.tabs.preferences.button.applyChanges,
    }).click({ force: true })
    cy.location("pathname").should("equal", "/ar")
  })

  it("should able to change language preferance from Arabic to English in real time", () => {
    cy.intercept("/api/user").as("user")
    helper.VisitUrl(e2e.urlPaths.profile)
    cy.findByRole("tab", { name: profileKeys.tabs.preferences.name }).click()
    cy.wait("@user", { timeout: 20000 })
    cy.wait(4000)
    cy.findByLabelText("language").click()
    cy.findByRole("button", { name: "English" }).click()
    cy.findByLabelText("language")
      .siblings("div")
      .eq(0)
      .find("button")
      .click({ force: true })
    cy.location("pathname").should("equal", e2e.urlPaths.profile, { timeout: 20000 })
  })


})

