Cypress.Commands.add("loginBE", (email?, password?) => {
  const sessionCookieName = Cypress.env("auth0SessionCookieName")

  try {
    cy.session("loginBE", () => {
      cy.loginUser({ email: "komepic750@ktasy.com", password: "komepic750@ktasy.comM" }).then((response) => {
        const { accessToken, expiresIn, idToken, scope } = response.body

        if (!accessToken) {
          throw new Error("accessToken missing from user token")
        }

        cy.getUser(accessToken).then((user) => {
          const persistedSession = {
            secret: Cypress.env("auth0CookieSecret"),
            idToken,
            accessToken,
            accessTokenScope: scope,
            accessTokenExpiresAt: Date.now() + expiresIn,
            createdAt: Date.now(),
            is_social: false,
            roles: ["Prospect"],
          }
          console.log(JSON.stringify(persistedSession))
          cy.task<string>("encrypt", persistedSession).then(
            (encryptedSession) => {
              console.log(encryptedSession)
              cy.setCookie(sessionCookieName, encryptedSession, {
                path: "/",
                httpOnly: true,
                timeout:10000
              })
               //window.localStorage.setItem(sessionCookieName,encryptedSession)
            },
          )
        })
      })
    })
  } catch (error) {
    cy.log(error)
  }
})

