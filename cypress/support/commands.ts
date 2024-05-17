import { UserLoginInfo } from "cypress/support/types";


Cypress.Commands.add('sendAPIRequest', (data: any) => {
    let gets = []
    console.log(JSON.stringify(data))
    return cy.request(data).then((response) => {
        gets.push({ request: data, response: response, time: response.duration, responseCode: response.status })
        console.log(JSON.stringify(response.body));
        return response
    })
})

Cypress.Commands.add('registerUser', (user: UserLoginInfo) => {
    console.log(user)
    let requestBody: any = {
        email: user.email,
        password: user.password,
        termsOfService: {
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
            agreedAt: new Date(),
            ipAddress: "testing"
        }
    }
    let config = {
        method: 'post',
        url: Cypress.env('apiBaseUrl') + '/auth/client/sign-up',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json',
            'App-Id': 'wmd.tfo',
        },
        body: JSON.stringify(requestBody),
        timeout: 10000
    };
    return cy.sendAPIRequest(config)
})

Cypress.Commands.add('getUser', (userAccessToken: string) => {

    let config = {
        method: 'get',
        url: Cypress.env('apiBaseUrl') + '/user',
        failOnStatusCode: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userAccessToken
        },
        timeout: 10000
    };
    return cy.sendAPIRequest(config)
})

Cypress.Commands.add('loginUser', (user: any) => {
    console.log(user)
    let requestBody = {
        username: user.email,
        password: user.password
    }

    let config = {
        method: 'post',
        url: Cypress.env('apiBaseUrl') + '/auth/client/token',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        timeout: 10000
    };

    return cy.sendAPIRequest(config)
})


Cypress.Commands.add('verifyOTP', (userAccessToken: string, data: any) => {
    let config = {
        method: 'post',
        url: Cypress.env('apiBaseUrl') + '/auth/verify-otp',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userAccessToken
        },
        body: JSON.stringify(data),
        timeout: 10000
    };

    return cy.sendAPIRequest(config)
})


Cypress.Commands.add('updateProfile', (userAccessToken: string, data: any) => {

    let config = {
        method: 'post',
        url: Cypress.env('apiBaseUrl') + '/user/profile',
        failOnStatusCode: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userAccessToken
        },
        body: JSON.stringify(data),
        timeout: 10000
    };
    return cy.sendAPIRequest(config)
})
