import { Helper } from "../../support/helper"
import { Tag } from "cypress/support/utils"
const rsiktestData = require('../../fixtures/riskAssessmentTestData.json')


describe([Tag.SMOKE], "Forgot password - " + Cypress.env('locale') + " - Desktop", () => {
    let username: string = "kzj5j2eycs4753ue@ethereal.email"
    let password: string = "dYbCzCCW7veeUVC8mUM@d1010"
    let mailPass: string
    let helper = new Helper()
    let userDetails
    let authKeys
    let commonKeys
    let e2e
    let flow
    let loopCount = rsiktestData.length

    before(() => {

        cy.fixture(`../../locales/${Cypress.env('locale')}/auth.json`).then((json) => { authKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/flow.json`).then((json) => { flow = json })
        // cy.fixture('riskAssessmentTestData.json').then((json) => { rsiktestData = json })
        // cy.task('getUserData').then((userInfo: any) => {
        //     userDetails = userInfo
        // })
        // cy.makeEmailAccount().then((user: UserLoginInfo) => {
        //     username = user.email
        //     mailPass = user.password
        //     password = user.password + "M@d1010"
        //     console.log(JSON.stringify(user))
        // })
        cy.intercept("api/portfolio/opportunities").as("opportunities")
        cy.intercept("api/user/relationship-manager").as("rm")
        cy.intercept("api/portfolio/insights/dashboard").as("dashboard")
        cy.intercept("api/user/execution-flow/status").as("status")
        cy.intercept("api/user/portfolio-opportunities").as("Popportunities")
       
    })

    beforeEach(() => {
        cy.intercept('api/user/risk-assessment/retake-result').as('riskResult')
        helper.loginUser("jeharip216@ngopy.com", "jeharip216@ngopy.comM")
        cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
    })


    for (let i = 0; i < loopCount; i++) {
        //let data =  rsiktestData[i]
        it('Risk assessment - TestId - ' + rsiktestData[i].testId, () => {
            cy.visit('/personalized-proposal')
            cy.findByRole('button', { name: 'Edit details', timeout: 50000 }).should('be.visible')
            cy.visit('/personalized-proposal/start-risk-assessment')
            cy.findByRole('link', { name: 'Get started', timeout: 50000 }).should('be.visible').click()
            cy.url({timeout:10000}).should('contain', '#1')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["1"]])
            cy.url({timeout:10000}).should('contain', '#2')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["2"]])
            cy.url({timeout:10000}).should('contain', '#3')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["3"]])
            cy.url({timeout:10000}).should('contain', '#4')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["4"]])
            cy.url({timeout:10000}).should('contain', '#5')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["5"]])
            cy.url({timeout:10000}).should('contain', '#6')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["6"]])
            cy.url({timeout:10000}).should('contain', '#7')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["7"]])
            cy.url({timeout:10000}).should('contain', '#8')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["8"]])
            cy.url({timeout:10000}).should('contain', '#9')
            helper.selectByTxtAndClickNext([rsiktestData[i].question["9"]])
            cy.get('a[href="/personalized-proposal/start-risk-assessment"]',{timeout:50000}).should('be.visible')
            cy.wait('@riskResult', { timeout: 90000 })
            .then((res) => {
                console.log("*****************")
                console.log(res.response.body.data)
                console.log("*****************")

                expect(JSON.stringify(res.response.body.data)).to.equal(JSON.stringify(rsiktestData[i].expected))
            })


            // cy.findByText(authKeys.login.link.forgotPassword, { timeout: 10000 }).should('be.visible').click()
            // cy.findByText(authKeys.forgot.subheading, { timeout: 10000 }).should('be.visible')
            // cy.findByPlaceholderText(authKeys.forgot.input.email.placeholder, { timeout: 10000 }).should('be.visible').type('passwordreset@mail7.io', { delay: 0 })
            // cy.findByRole('button', { name: authKeys.forgot.button.send }).should('be.visible').click()
            // cy.findByText(authKeys.forgot.emailSentSuccess.heading, { timeout: 20000 }).should('be.visible')
            // helper.resetPasswordFromUserInobx(userDetails.executionFlowKSA.username, 'newPasword@123')
            // cy.loginUser({ username: userDetails.executionFlowKSA.username, password: userDetails.executionFlowKSA.password }).then((res) => {
            //     console.log(userDetails.executionFlowKSA.userProfile)
            //     helper.createProfile(res.body.accessToken, userDetails.executionFlowKSA.userProfile)
            //     cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
            // })
        })
    }



})