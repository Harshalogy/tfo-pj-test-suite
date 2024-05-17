
import { Helper } from "../../support/helper";
import { UserLoginInfo } from "cypress/support/types"
import { Tag } from "cypress/support/utils"


describe([Tag.SMOKE], "SignUp - " + Cypress.env('locale') + " - Desktop", () => {
    let username: string
    let password: string
    let mailPass: string
    let helper = new Helper()
    let authKeys: any
    let commonKeys: any
    let e2e: any
    let flow: any
    let eflow: any
    let data: any
    let userProfile: any
    let userToken: any

    let userDetails = {
        advisoryUser: {
            username,
            password,
            userProfile,
            userToken
        }, executionFlowNonKSA: {
            username,
            password,
            userProfile,
            userToken
        },
        executionFlowKSA: {
            username,
            password,
            userProfile,
            userToken
        }
    }


    beforeEach(() => {
        cy.fixture(`../../locales/${Cypress.env('locale')}/auth.json`).then((json) => { authKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/flow.json`).then((json) => { flow = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/executionFlow.json`).then((json) => { eflow = json })
        cy.intercept("/auth/verify-otp").as("verifyOTP")
        cy.intercept("/api/auth/login").as("successLogin")
        cy.intercept("api/portfolio/opportunities").as("opportunities")
        cy.intercept("api/user/relationship-manager").as("rm")
        cy.intercept("api/portfolio/insights/dashboard").as("dashboard")
        cy.intercept("api/user/execution-flow/status").as("status")
        cy.intercept("api/user/portfolio-opportunities").as("Popportunities")
        cy.makeEmailAccount().then((user: UserLoginInfo) => {
            username = user.email
            mailPass = user.password
            password = user.password + "M@d1010"
            console.log(JSON.stringify(user))
            let emailAccount = {
                email: username,
                password: mailPass,
            }
            cy.visit('/signup', { retryOnNetworkFailure: true, retryOnStatusCodeFailure: true, log: true })
            helper.signUpUser(username, password)
            helper.verifyEmail(emailAccount)
        })
    })

    afterEach(() => {
        cy.wait("@opportunities", { timeout: 20000 }).its("response.statusCode").should("equal", 200)
        cy.wait("@rm", { timeout: 20000 }).its("response.statusCode").should("equal", 200)
        cy.wait("@dashboard", { timeout: 20000 }).its("response.statusCode").should("equal", 200)
        data.type != 'advisory' ? cy.wait("@status", { timeout: 20000 }).its("response.statusCode").should("equal", 200) : cy.log("PASS")
        data.type != 'advisory' ? cy.wait("@Popportunities", { timeout: 20000 }).its("response.statusCode").should("equal", 200) : cy.log("PASS")
    })

    after(() => {
        cy.task('setUserData', userDetails)
    })

    it('Execution Flow - KSA', () => {
        data = {
            type: 'execution',
            userDetails: {
                firstName: "Madhan",
                lastName: "TEST",
                countryOfResidence: "SA",
                nationality: "BH",
                phoneCountryCode: "IN +91",
                phoneNumber: "9999999999"
            },
            qualificationQuestionOne: [eflow.qualificationQuestionOne.checkBox.options.three],
            qualificationQuestionTwo: [eflow.qualificationQuestionTwo.checkBox.options.five],
            qualificationQuestionThree: [eflow.qualificationQuestionThree.ksa.checkBox.options.one, eflow.qualificationQuestionThree.ksa.checkBox.options.two, eflow.qualificationQuestionThree.ksa.checkBox.options.three]
        }
        helper.chooseFlow(data.type)
        cy.loginUser({ username: username, password: password }).then((res) => {
            console.log(res)
            userDetails.executionFlowKSA.userToken = res.body.accessToken
            userDetails.executionFlowKSA.userProfile = data.userDetails
            helper.createProfile(res.body.accessToken, data.userDetails)
        })
        // helper.fillUserDetails(data.userDetails)
        // helper.continue()
        // for (let index = 0; index < 20; index++) {
        //     helper.sendVerification()
        //     data.userDetails.phoneNumber = (parseInt(data.userDetails.phoneNumber) + index).toString()
        //     helper.back()
        //     cy.get('input#phoneNumber', { timeout: 20000 }).should('be.visible').clear().type(data.userDetails.phoneNumber).should('have.value', data.userDetails.phoneNumber).wait(500)
        // }
        helper.selectByTxtAndContinue(data.qualificationQuestionOne)
        helper.selectByTxtAndContinue(data.qualificationQuestionTwo)
        helper.selectByTxtAndContinue(data.qualificationQuestionThree)
        cy.url({ timeout: 15000 }).should('eq', 'https://myqa.tfoco.dev/')
        userDetails.executionFlowKSA.username = username
        userDetails.executionFlowKSA.password = password
    })

    it('Execution Flow - Non KSA', () => {
        data = {
            type: 'execution',
            userDetails: {
                firstName: "Madhan",
                lastName: "TEST",
                countryOfResidence: "KW",
                nationality: "KW",
                phoneCountryCode: "IN +91",
                phoneNumber: "9999999999"
            },
            qualificationQuestionOne: [eflow.qualificationQuestionOne.checkBox.options.three],
            qualificationQuestionTwo: [eflow.qualificationQuestionTwo.checkBox.options.five],
            qualificationQuestionThree: [eflow.qualificationQuestionThree.nonKsa.checkBox.options.one, eflow.qualificationQuestionThree.nonKsa.checkBox.options.two, eflow.qualificationQuestionThree.nonKsa.checkBox.options.three]
        }
        helper.chooseFlow(data.type)
        cy.loginUser({ username: username, password: password }).then((res) => {
            console.log(res)
            userDetails.executionFlowNonKSA.userToken = res.body.accessToken
            userDetails.executionFlowNonKSA.userProfile = data.userDetails
            helper.createProfile(res.body.accessToken, data.userDetails)
        })
        // for (let index = 0; index < 20; index++) {
        //     helper.sendVerification()
        //     data.userDetails.phoneNumber = (parseInt(data.userDetails.phoneNumber) + index).toString()
        //     helper.back()
        //     cy.get('input#phoneNumber', { timeout: 20000 }).should('be.visible').clear().type(data.userDetails.phoneNumber).should('have.value', data.userDetails.phoneNumber).wait(500)
        // }
        helper.selectByTxtAndContinue(data.qualificationQuestionOne)
        helper.selectByTxtAndContinue(data.qualificationQuestionTwo)
        helper.selectByTxtAndContinue(data.qualificationQuestionThree)
        cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
        userDetails.executionFlowNonKSA.username = username
        userDetails.executionFlowNonKSA.password = password
    })

    it('Advisory Flow', () => {
        data = {
            type: 'advisory',
            userDetails: {
                firstName: "Madhan",
                lastName: "TEST",
                countryOfResidence: "KW",
                nationality: "KW",
                phoneCountryCode: "IN +91",
                phoneNumber: "9999999999"
            },
            qualificationQuestionOne: [eflow.qualificationQuestionOne.checkBox.options.three],
            qualificationQuestionTwo: [eflow.qualificationQuestionTwo.checkBox.options.five],
            qualificationQuestionThree: [eflow.qualificationQuestionThree.nonKsa.checkBox.options.one, eflow.qualificationQuestionThree.nonKsa.checkBox.options.two, eflow.qualificationQuestionThree.nonKsa.checkBox.options.three]
        }
        userDetails.executionFlowKSA.username = username
        userDetails.executionFlowKSA.password = password
        helper.chooseFlow(data.type)
        cy.loginUser({ username: username, password: password }).then((res) => {
            console.log(res)
            userDetails.advisoryUser.userToken = res.body.accessToken
            userDetails.advisoryUser.userProfile = data.userDetails
            helper.createProfile(res.body.accessToken, data.userDetails)
        })
        // helper.fillUserDetails(data.userDetails)
        // helper.sendVerification()
        // helper.submitOTP("123456")
        // for (let index = 0; index < 20; index++) {
        //     helper.sendVerification()
        //     data.userDetails.phoneNumber = (parseInt(data.userDetails.phoneNumber) + index).toString()
        //     helper.back()
        //     cy.get('input#phoneNumber', { timeout: 20000 }).should('be.visible').clear().type(data.userDetails.phoneNumber).should('have.value', data.userDetails.phoneNumber).wait(500)
        // }
        // helper.selectByTxtAndContinue(data.qualificationQuestionOne)
        // helper.selectByTxtAndContinue(data.qualificationQuestionTwo)
        // helper.selectByTxtAndContinue(data.qualificationQuestionThree)
        cy.url({ timeout: 30000 }).should('eq', 'https://myqa.tfoco.dev/')
        userDetails.advisoryUser.username = username
        userDetails.advisoryUser.password = password
    })

})

describe([Tag.SMOKE], "Login - " + Cypress.env('locale') + " - Desktop", () => {
    let username: string = "kzj5j2eycs4753ue@ethereal.email"
    let password: string = "dYbCzCCW7veeUVC8mUM@d1010"
    let mailPass: string
    let helper = new Helper()
    let userDetails
    let authKeys
    let commonKeys
    let e2e
    let flow

    before(() => {

        cy.fixture(`../../locales/${Cypress.env('locale')}/auth.json`).then((json) => { authKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/flow.json`).then((json) => { flow = json })
        cy.task('getUserData').then((userInfo: any) => {
            userDetails = userInfo
        })
        // cy.makeEmailAccount().then((user: UserLoginInfo) => {
        //     username = user.email
        //     mailPass = user.password
        //     password = user.password + "M@d1010"
        //     console.log(JSON.stringify(user))
        // })
    })

    beforeEach(() => {
        cy.intercept("api/portfolio/opportunities").as("opportunities")
        cy.intercept("api/user/relationship-manager").as("rm")
        cy.intercept("api/portfolio/insights/dashboard").as("dashboard")
        cy.intercept("api/user/execution-flow/status").as("status")
        cy.intercept("api/user/portfolio-opportunities").as("Popportunities")
    })


    it('should verify esiting user login - Advisory - phone number verified', () => {
        helper.loginUser("yajepot526@crtsec.com", "yajepot526@crtsec.comM")
        cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
        // cy.loginUser({ username: username, password: password }).then((res) => {
        //     console.log(res)
        //     helper.createProfile(res.body.accessToken, profileData)
        // })
    })

    // it('should verify esiting user login - Advisory - phone number not verified', () => {
    //     helper.loginUser("pahow25411@ezgiant.com", "pahow25411@ezgiant.comM")
    //     cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/onboarding/profile')
    // })

    // it('should verify esiting user login - Execution - phone number verified - qualification questions completed', () => {
    //     helper.loginUser("mogabo9030@ekcsoft.com", "mogabo9030@ekcsoft.comM")
    //     cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
    // })

    // it('should verify esiting user login - Execution - phone number verified - qualification questions not completed', () => {
    //     helper.loginUser("fiwahi1495@chotunai.com", "fiwahi1495@chotunai.comM")
    //     cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/execution-flow')
    // })

    it('should verify execution flow KSA user login', () => {
        helper.loginUser(userDetails.executionFlowKSA.username, userDetails.executionFlowKSA.password)
        cy.loginUser({ username: userDetails.executionFlowKSA.username, password: userDetails.executionFlowKSA.password }).then((res) => {
            console.log(userDetails.executionFlowKSA.userProfile)
            helper.createProfile(res.body.accessToken, userDetails.executionFlowKSA.userProfile)
            cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
        })
    })

    it('should verify execution flow Non KSA user login', () => {
        helper.loginUser(userDetails.executionFlowNonKSA.username, userDetails.executionFlowNonKSA.password)
        cy.loginUser({ username: userDetails.executionFlowNonKSA.username, password: userDetails.executionFlowNonKSA.password }).then((res) => {
            console.log(userDetails.executionFlowKSA.userProfile)
            // helper.createProfile(res.body.accessToken, userDetails.executionFlowNonKSA.userProfile)
            cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
        })
    })

    it('should verify advisory flow user login', () => {
        helper.loginUser(userDetails.advisoryUser.username, userDetails.advisoryUser.password)
        cy.loginUser({ username: userDetails.advisoryUser.username, password: userDetails.advisoryUser.password }).then((res) => {
            console.log(userDetails.executionFlowKSA.userProfile)
            helper.createProfile(res.body.accessToken, userDetails.advisoryUser.userProfile)
            cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
        })
    })

    // it('login with gmail ', () => {
    //     cy.visit("https://tfo-uat.eu.auth0.com/authorize?response_type=code&client_id=umf5SicJaUFgoXXyU0WX0ZMQqopUjXe0&scope=openid email&audience=https://tfo-uat.eu.auth0.com/api/v2/&connection=google-oauth2&state=Google||myqa.tfoco.dev/login&redirect_uri=https://myqa.tfoco.dev/api/auth/callback-en?returnTo=")
    //     //cy.get('button.css-en-1jsmvpv').eq(1).should('be.visible').click()
    //     cy.wait(2000)
    //    // cy.origin('https://accounts.google.com',{args:{}}, () => {
    //         cy.get('input[type="email"]').should('be.visible').type('tfotestuser')
    //         cy.get("#identifierNext").click()
    //         cy.wait(5000)
    //         cy.get('input[type="password"]').should('be.visible').type('tfotestuser@123')
    //         cy.get("#passwordNext").click()
    //         cy.wait(10000)
    //    // })

    //     // cy.get("#identifierNext").click()
    //     // cy.wait(5000)
    //     // cy.get('input[type="password"]').type('tfotestuser@123')
    //     // cy.get("#passwordNext").click()
    //     //cy.wait(10000)
    //     // cy.origin('https://google.com', () => {

    //     // })
    //     // cy.origin('https://google.com', () => {
    //     //     cy.pause()
    //     // })
    // })

})

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

    before(() => {

        cy.fixture(`../../locales/${Cypress.env('locale')}/auth.json`).then((json) => { authKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
        cy.fixture(`../../locales/${Cypress.env('locale')}/flow.json`).then((json) => { flow = json })
        cy.task('getUserData').then((userInfo: any) => {
            userDetails = userInfo
        })
        // cy.makeEmailAccount().then((user: UserLoginInfo) => {
        //     username = user.email
        //     mailPass = user.password
        //     password = user.password + "M@d1010"
        //     console.log(JSON.stringify(user))
        // })
    })

    beforeEach(() => {
        cy.intercept("api/portfolio/opportunities").as("opportunities")
        cy.intercept("api/user/relationship-manager").as("rm")
        cy.intercept("api/portfolio/insights/dashboard").as("dashboard")
        cy.intercept("api/user/execution-flow/status").as("status")
        cy.intercept("api/user/portfolio-opportunities").as("Popportunities")
        cy.visit(e2e.urlPaths.login, { timeout: 20000 })
    })

    it('should verify existing user able to reset the password using forgot password in login page and login with new password', () => {
        cy.wait(10000)
        cy.findByText(authKeys.login.link.forgotPassword, { timeout: 10000 }).should('be.visible').click()
        cy.findByText(authKeys.forgot.subheading, { timeout: 10000 }).should('be.visible')
        cy.findByPlaceholderText(authKeys.forgot.input.email.placeholder, { timeout: 10000 }).should('be.visible').type('passwordreset@mail7.io', { delay: 0 })
        cy.findByRole('button', { name: authKeys.forgot.button.send }).should('be.visible').click()
        cy.findByText(authKeys.forgot.emailSentSuccess.heading, { timeout: 20000 }).should('be.visible')
        // helper.resetPasswordFromUserInobx(userDetails.executionFlowKSA.username, 'newPasword@123')
        // cy.loginUser({ username: userDetails.executionFlowKSA.username, password: userDetails.executionFlowKSA.password }).then((res) => {
        //     console.log(userDetails.executionFlowKSA.userProfile)
        //     helper.createProfile(res.body.accessToken, userDetails.executionFlowKSA.userProfile)
        //     cy.url({ timeout: 20000 }).should('eq', 'https://myqa.tfoco.dev/')
        // })
    })



})