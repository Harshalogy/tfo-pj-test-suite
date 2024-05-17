Cypress.Commands.add("loginSocial", () => {
  const sessionCookieName = Cypress.env("auth0SessionCookieName")
  try {
    cy.request({
      method: "POST",
      url: "https://" + Cypress.env("beBaseUrl") + "/auth/client/token",
      body: {
        username: Cypress.env("auth0UserEmail"),
        password: Cypress.env("auth0Password"),
      },
    }).then((response) => {
      const { accessToken, expiresIn, idToken, scope } = response.body

      if (!accessToken) {
        throw new Error("accessToken missing from user token")
      }

      cy.getUserInfo(accessToken).then((user) => {
        const persistedSession = {
          secret: Cypress.env("auth0CookieSecret"),
          user,
          idToken,
          accessToken,
          accessTokenScope: scope,
          accessTokenExpiresAt: Date.now() + expiresIn,
          createdAt: Date.now(),
          is_social: true,
          roles: ["Prospect"],
        }

        cy.task<string>("encrypt", persistedSession).then(
          (encryptedSession) => {
            cy.setCookie(sessionCookieName, encryptedSession, {
              path: "/",
              httpOnly: true,
            })
          },
        )
      })
    })
  } catch (error) {
    cy.log(error)
  }
})
