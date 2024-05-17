import fs from "fs-extra"
import path from 'path'

export class Helper {
  //file = '../../locales/' + Cypress.env('locale') + '/auth.json'path.resolve(
  //     __dirname,
  //     "cypress/config",
  //     `${file}.json`,
  //   )

  authKeys = require('../../locales/en/auth.json')
  commonKeys = require('../../locales/en/common.json')
  e2e = require('../../locales/en/e2e.json')
  flow = require('../../locales/en/flow.json')
  profile = require('../../locales/en/profile.json')
  ef = require('../../locales/en/executionFlow.json')
  countries = require('../../locales/en/countries.json')
  proposalkeys = require('../../locales/en/proposal.json')

  // constructor(auth) {
  //     this.authKeys = auth
  //     // console.log(`./locales/${Cypress.env('locale')}/auth.json`)
  //     // let p = `../../locales/${Cypress.env('locale')}/auth.json`.toString()
  //     // console.log(p)
  //     // this.authKeys = fs.readJSONSync("")
  //     // fs.readJSON(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { this.commonKeys = json })
  //     // fs.readJSON(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { this.e2e = json })
  //    // fs.readJSON(`../../locales/${Cypress.env('locale')}/scheduleKeys.json`).then((json) => {this.scheduleKeys = json })
  //     // fs.readJSON(`../../locales/${Cypress.env('locale')}/flow.json`).then((json) => { this.flow = json })
  // }


  signUpUser(username, password) {
    cy.intercept("/api/auth/signup").as("successSignUp")
    cy.findByPlaceholderText(this.authKeys.signup.input.email.placeholder, { timeout: 20000 })
      .clear()
      .type(username)
    cy.findByPlaceholderText(this.authKeys.signup.input.password.placeholder)
      .clear()
      .type(password)
    // eslint-disable-next-line
    cy.get('input[type="checkbox"]', { timeout: 5000 })
      .check({ force: true })
      .should("be.checked")
    cy.findByRole("button", { name: this.authKeys.signup.button.submit }).should(
      "be.enabled",
    )
    cy.findByRole("button", { name: this.authKeys.signup.button.submit }).click()
    cy.wait("@successSignUp", { timeout: 30000 }).its("response.statusCode").should("equal", 200)

  }
  VisitUrl(value) {
    cy.visit(value)
    cy.intercept('/api/user').as('getuser')
    cy.wait('@getuser', { timeout: 20000 })
  }


  verifyEmail(emailAccount) {
    cy.task("getLastUserEmail", emailAccount).its("html")
      .then((html) => {
        cy.document({ log: false }).invoke({ log: false }, "write", html)
      })
    cy.get('a.button', { timeout: 20000 }).should('be.visible').click()
    cy.location("pathname", { timeout: 20000 }).should("equal", this.e2e.urlPaths.verifyResponse, { timeout: 10000 })
    cy.findAllByRole('button', { name: this.commonKeys.button.continue, timeout: 20000 }).should('be.visible').click()
    // cy.findByText(this.flow.toast.account.title, {
    //   timeout: 20000,
    // })
    //   .should("be.visible")
  }


  resetPasswordFromUserInobx(emailAccount, newPassword: string) {
    cy.task("getLastUserEmail", emailAccount).its("html")
      .then((html) => {
        cy.document({ log: false }).invoke({ log: false }, "write", html)
      })
    cy.get('a.button', { timeout: 20000 }).should('be.visible').click()
    cy.location("pathname", { timeout: 20000 }).should("equal", this.e2e.urlPaths.verifyResponse, { timeout: 10000 })
    cy.findAllByRole('button', { name: this.commonKeys.button.continue, timeout: 20000 }).should('be.visible').click()
    // cy.findByText(this.flow.toast.account.title, {
    //   timeout: 20000,
    // })
    //   .should("be.visible")
  }
  FlowAPI(type: string) {
    if (type == 'Simulate your Portfolio') {
      cy.findAllByRole("slider").eq(0).type("{rightarrow}")
    } else {
      cy.findAllByRole("slider").eq(0).type("{leftarrow}")
    }
  }

  GetSpinner() {
    cy.intercept("/v2/track").as("track")
    cy.wait("@track", { timeout: 20000 })
    cy.findByLabelText("spinner").should("not.exist", { timeout: 30000 })
  }

  chooseFlow(type: string) {
    if (type == 'advisory') {
      cy.findAllByRole('button', { name: this.flow.accordion.advisory.heading, timeout: 30000 }).should('be.visible').click()
      cy.wait(1000)
      cy.findAllByRole('button', { name: this.commonKeys.button.continue, timeout: 10000 }).should('be.visible').click()
      cy.findByText(this.profile.onboarding.heading["0"], {
        timeout: 20000,
      })
        .should("be.visible")
    } else {
      cy.findAllByRole('button', { name: this.flow.accordion.execution.heading, timeout: 30000 }).should('be.visible').wait(1000).click()
      cy.wait(1000)
      cy.findAllByRole('button', { name: this.commonKeys.button.continue, timeout: 10000 }).should('be.visible').wait(1000).click()
      cy.findByText(this.ef.setup.heading, {
        timeout: 20000,
      })
        .should("be.visible")
    }
  }

  fillUserDetails(userDetails: any) {
    cy.findByPlaceholderText(this.ef.setup.input.firstName.label, { timeout: 20000 }).should('be.visible').type(userDetails.firstName).should('have.value', userDetails.firstName)
    cy.findByPlaceholderText(this.ef.setup.input.lastName.label).should('be.visible').type(userDetails.lastName).should('have.value', userDetails.lastName)
    cy.get('#countryOfResidence').findByText(this.ef.setup.select.countryOfResidence.placeholder).should('be.visible').wait(500).type(userDetails.countryOfResidence + '{enter}').wait(500)
    cy.get('#nationality').findByText(this.ef.setup.select.nationality.placeholder).should('be.visible').click().type(userDetails.nationality + '{enter}').wait(500)
    cy.get('#phoneCountryCode').should('be.visible').click().type(userDetails.phoneCode + '{enter}').wait(500)
    cy.get('input#phoneNumber').should('be.visible').click().type(userDetails.phoneNumber).should('have.value', userDetails.phoneNumber).wait(500)
  }

  selectByTxtAndContinue(texts: string[]) {
    texts.forEach((txt) => {
      txt.lastIndexOf('</0>') != -1 ? txt = txt.split('</0>')[1] : txt = txt
      cy.findByText(txt, { timeout: 30000 }).should('be.visible').wait(500).click()
    })
    this.continue()
  }

  selectByTxtAndClickNext(texts: string[]) {
    texts.forEach((txt) => {
      txt.lastIndexOf('</0>') != -1 ? txt = txt.split('</0>')[1] : txt = txt
      cy.findByText(txt, { timeout: 30000 }).should('be.visible').wait(500).click()
    })
    this.next()
  }

  continue() {
    cy.findByRole('button', { name: this.commonKeys.button.continue, timeout: 5000 }).should('be.visible').click()
  }

  next() {
    cy.findByRole('button', { name: this.commonKeys.button.next, timeout: 5000 }).should('be.visible').click()
  }

  Login(username, password) {
    cy.visit(this.e2e.urlPaths.login, { timeout: 20000 })
    cy.intercept("/v2/track").as("track")
    cy.wait("@track", { timeout: 20000 })
      .wait(4000)
    cy.findByPlaceholderText(this.authKeys.login.input.email.placeholder,
      { timeout: 20000 })
      .clear()
      .type(username)
    cy.findByPlaceholderText(this.authKeys.login.input.password.placeholder)
      .clear()
      .type(password)
    cy.findByRole("button", { name: this.authKeys.login.button.login })
      .click()
      .wait(1000)
  }

  SignUpPageValidation() {
    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()
    cy.findAllByText(this.commonKeys.errors.required)
      .should("have.length", 6)
    cy.findByLabelText(this.profile.tabs.personal.fields.label.firstName,
      { timeout: 12000 })
      .type("123",
      )
    cy.findByLabelText(this.profile.tabs.personal.fields.label.lastName).type(
      "123",
    )
    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()
    cy.findAllByText(this.commonKeys.errors.alphaEnglishAllowed,
      { timeout: 12000 })
      .should(
        "have.length",
        2,
      )
    cy.findByLabelText(this.profile.tabs.personal.fields.label.firstName)
      .should(
        "have.attr",
        "maxlength",
        "100",
      )
    cy.findByLabelText(this.profile.tabs.personal.fields.label.firstName)
      .clear()
      .type("test")
    cy.findByLabelText(this.profile.tabs.personal.fields.label.lastName)
      .clear()
      .type("user")
    cy.findByLabelText(this.ef.setup.select.countryOfResidence.label)
      .click({ force: true })
    cy.findAllByRole("button")
      .filter("[tabindex='-1']")
      .then(($elements) => {
        var listOfCountries = Cypress._.map($elements, (el) => el.innerText)

        expect(listOfCountries[0]).to.be.equal(this.countries.SA)
        expect(listOfCountries[1]).to.be.equal(this.countries.BH)
        expect(listOfCountries[2]).to.be.equal(this.countries.KW)
        expect(listOfCountries[3]).to.be.equal(this.countries.AE)
        expect(listOfCountries[4]).to.be.equal(this.countries.OM)
        listOfCountries = Cypress._.drop(listOfCountries, 5)

        cy.wrap(Cypress._.sortBy(listOfCountries)).should(
          "deep.equal",
          listOfCountries,
        )
      })
    cy.findByText(this.countries.AF).click({ force: true })
    cy.findByLabelText(this.ef.setup.select.nationality.label,
      { timeout: 8000 })
      .click({ force: true })
    cy.findAllByRole("button",
      { timeout: 8000 })
      .filter("[tabindex='-1']")
      .then(($elements) => {
        var listofNationalities = Cypress._.map($elements, (el) => el.innerText)

        expect(listofNationalities[0]).to.be.equal(this.countries.SA)
        expect(listofNationalities[1]).to.be.equal(this.countries.BH)
        expect(listofNationalities[2]).to.be.equal(this.countries.KW)
        expect(listofNationalities[3]).to.be.equal(this.countries.AE)
        expect(listofNationalities[4]).to.be.equal(this.countries.OM)
        listofNationalities = Cypress._.drop(listofNationalities, 5)

        cy.wrap(Cypress._.sortBy(listofNationalities)).should(
          "deep.equal",
          listofNationalities,
        )
      })

    cy.findByText(this.countries.SA).click({ force: true })
    const validationMessage = String(
      this.commonKeys.errors.phoneNumberLength,
    ).replace("{{digit}}", "9")
    cy.findByLabelText("phoneCountryCode")
      .click()
    cy.findByRole("button",
      { name: "SA +966" })
      .click()

    cy.findByLabelText("phone number")
      .clear()
      .type("88888888888")

    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()

    cy.findByText(validationMessage).should("be.visible")
    const validationMessage1 = String(
      this.commonKeys.errors.phoneNumberLength,
    ).replace("{{digit}}", "8")
    cy.findByLabelText("phoneCountryCode")
      .type("KW +965")
    cy.findByRole("button", { name: "KW +965" })
      .click()
    cy.findByLabelText("phone number", { timeout: 8000 })
      .clear()
      .type("888888888")

    cy.findByRole("button", {
      name: this.e2e.continue,
      timeout: 12000
    })
      .click()
    cy.findByText(validationMessage1).should("be.visible")

    cy.findByLabelText("phoneCountryCode")
      .type("BH +973")
    cy.findByRole("button", { name: "BH +973" }).click()

    cy.findByLabelText("phone number", { timeout: 8000 })
      .clear()
      .type("8888888888")

    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()
    cy.findByText(validationMessage1)
      .should("be.visible")
    cy.findByLabelText("phoneCountryCode")
      .type("OM +968")
    cy.findByRole("button",
      { name: "OM +968" })
      .click()

    cy.findByLabelText("phone number")
      .clear()
      .type("888888888")

    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()

    cy.findByText(validationMessage1).should("be.visible")


    const validationMessage2 = String(
      this.commonKeys.errors.phoneNumberLengthMax,
    ).replace("{{digit}}", "15")
    cy.findByLabelText("phoneCountryCode").type("IN +91")
    cy.findByRole("button", { name: "IN +91" }).click({ force: true })

    cy.findByLabelText("phone number")
      .clear()
      .type("88888888888888888")

    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()

    cy.findByText(validationMessage2).should("be.visible")
    cy.findByLabelText("phoneCountryCode").type("IN +91")
    cy.findByRole("button", { name: "IN +91" }).click()
    cy.findByLabelText("phone number")
      .clear()
      .type("9999999999")
    cy.findByRole("button", {
      name: this.e2e.continue_for_exe_flow,
      timeout: 8000
    })
      .click()
  }

  qualifyQuestionOne() {
    cy.findByText(this.ef.qualificationQuestionOne.heading,
      { timeout: 12000 }).
      should("be.visible")
    cy.findByText(this.ef.qualificationQuestionOne.description)
      .should("be.visible")
    cy.findByText(this.ef.buttons.back)
      .should("be.visible")

    cy.findByText(this.ef.qualificationQuestionOne.checkBox.options.one)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionOne.checkBox.options.two)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionOne.checkBox.options.three)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.buttons.continue)
      .should("be.visible")
      .click()
  }

  qualifyQuestionTwo() {
    cy.findByText(this.ef.qualificationQuestionTwo.heading,
      { timeout: 12000 })
      .should("be.visible")
    cy.findByText(this.ef.qualificationQuestionTwo.description)
      .should("be.visible")
    cy.findByText(this.ef.buttons.back)
      .should("be.visible")
    cy.findByText(this.ef.qualificationQuestionTwo.checkBox.options.one)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionTwo.checkBox.options.two)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionTwo.checkBox.options.three)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionTwo.checkBox.options.four)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionTwo.checkBox.options.five)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.buttons.continue)
      .should("be.visible")
      .click()
  }

  qualifyQuestionThree() {
    cy.findByText(this.ef.qualificationQuestionThree.nonKsa.heading,
      { timeout: 12000 })
      .should("be.visible")
    cy.findByText(this.ef.qualificationQuestionThree.nonKsa.description,
      { timeout: 12000 })
      .should("be.visible")
    // cy.findByText(this.ef.qualificationQuestionThree.text.familyOffice+this.ef.qualificationQuestionThree.text.regulatedByCBB+this.ef.qualificationQuestionThree.text.eligible,{timeout:12000}).should("be.visible")

    cy.findByText(this.ef.buttons.back,
      { timeout: 12000 })
      .should("be.visible")
    cy.findByText(this.ef.qualificationQuestionThree.text.regulatedByCBB).click({ force: true })
    cy.findByText(this.proposalkeys.investorProfile.personalInformation.radio.isAccreditedByCBB.modal.title)
      .should("be.visible")
    //  cy.findByText(proposalkeys.investorProfile.personalInformation.radio.isAccreditedByCBB.modal.description).should("be.visible")
    cy.findByText(this.proposalkeys.investorProfile.personalInformation.radio.isAccreditedByCBB.modal.button.label)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.buttons.continue)
      .should("be.visible")
      .click({ force: true })
    cy.findByText(this.ef.qualificationQuestionThree.nonKsa.checkBox.options.one,
      { timeout: 12000 })
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionThree.nonKsa.checkBox.options.two)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionThree.nonKsa.checkBox.options.three)
      .should("be.visible")
      .click()
    cy.findByText(this.ef.qualificationQuestionThree.nonKsa.checkBox.options.four)
      .should("be.visible")
      .click()
    cy.findByRole("button", { name: this.ef.qualificationQuestionThree.text.regulatedByCBB })
      .should("be.visible")
      .click()
  }

  loginUser(userName, Password, preserve?: boolean) {

    if (preserve) {

      cy.session([userName, Password], () => {

        cy.intercept("/api/auth/login").as("successLogin")
        cy.intercept("/api/user").as("user")
        cy.visit(this.e2e.urlPaths.login)
        cy.wait(10000)
        cy.findByPlaceholderText(this.authKeys.login.input.email.placeholder,)

          .type(userName, { delay: 200 })
          .clear().type(userName, { delay: 0 })
          .should("have.value", userName)

        cy.findByPlaceholderText(this.authKeys.login.input.password.placeholder).click().type(

          Password,

        )

        // eslint-disable-next-line

        cy.findByRole("button", { name: this.authKeys.login.button.login }).should('be.enabled').click()

        cy.wait("@successLogin", { timeout: 10000 }).its("response.statusCode").should("equal", 200)

        // cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')

      },

        /*   {

               validate() {

                 // cy.intercept('/user').its('status').should('eq', 200,)
                 cy.visit("/")
                  cy.wait('@user',{timeout:20000}).its('response.statusCode').should('eq', 200)
                  

              } 

          } */

      )

    } else {

      cy.intercept("/api/auth/login").as("successLogin")

      cy.visit(this.e2e.urlPaths.login)

      cy.wait(10000)
      cy.findByPlaceholderText(this.authKeys.login.input.email.placeholder,)

        .type(userName, { delay: 200 })
        .clear().type(userName, { delay: 0 })
        .should("have.value", userName)

      cy.findByPlaceholderText(this.authKeys.login.input.password.placeholder).click().type(

        Password,

      )
      // eslint-disable-next-line

      cy.findByRole("button", { name: this.authKeys.login.button.login }).click()

      cy.wait("@successLogin", { timeout: 10000 }).then((res) => {
        if (res.response.statusCode != 200) {
          this.loginUser(userName, Password)
        }
      })

      //cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')

    }

  }

  createProfile(userToken, profileData) {
    let userProfile
    cy.updateProfile(userToken, profileData).then((re) => {
      // console.log('++++++++++++')
      // userProfile =  re.body
      // console.log(re.body)
      cy.verifyOTP(userToken, {
        "otp": "111111",
        "phoneNumber": "+919999999999"
      })
      cy.reload({ timeout: 20000 })
      cy.wait(5000)
      // cy.wait('@verifyOTP', { timeout: 20000 }).its('response.code').should('equal', 200)
    })
    //return userProfile
  }


}
