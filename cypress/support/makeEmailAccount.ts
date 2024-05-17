import { UserLoginInfo } from "cypress/support/types"

Cypress.Commands.add("makeEmailAccount", () => {
  
  return cy.exec('node mailer.js').then((m) => {
    if(m.stderr){
      new Error("Error in getting test emails *\n" + m.stderr)
    }
    let userEmail: UserLoginInfo = {
      email: JSON.parse(m.stdout).email,
      password: JSON.parse(m.stdout).password
    }
    return userEmail
  })
})
