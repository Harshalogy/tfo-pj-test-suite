import "@testing-library/cypress/add-commands"
import "./loginBE"
import "./getUserInfo"
import "./loginSocial"
import "./logout"
import "cypress-recurse"
import "cypress-mochawesome-reporter/register"
import "./makeEmailAccount"
import "./helper"
import './commands'
import '@percy/cypress'
import 'cypress-network-idle'
/// <reference types='cypress-tags' />
/// <reference types="cypress-network-idle" />


// before(() => {

//   // const sessionCookieName = Cypress.env("auth0SessionCookieName")
//   // Cypress.Cookies.defaults({
//   //   preserve: sessionCookieName,
//   // })
//   //cy.visit('/')
// })

before(() => {
  
  const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
  Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false
    }
  })
  
})


