import { Auth0UserProfile } from "auth0-js"
import { UserLoginInfo } from "cypress/support/types"

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login BE.
       */
      loginBE(email?: string, password?: string): Chainable<Element>

      /**
       * Custom command to get user profile info.
       */
      getUserInfo(accessToken: string): Chainable<Auth0UserProfile>

      /**
       * Custom command to login using Social account from BE.
       */
      loginSocial(): Chainable<Element>

      /**
       * Custom command to logout.
       */
      logout(): Chainable<Element>

      /**
       * Custom command make test email accounts
       */
      makeEmailAccount(): Chainable<UserLoginInfo>

      /**
       * register user via API
       */
      getUser(user: string): Chainable<Response<any>>

      /**
       * register user via API
       */
      loginUser(user: any): Chainable<Response<any>>

      /**
       * Send api request with provided data
       */
      sendAPIRequest(data: any): Chainable<Response<any>>

      loginByGoogleApi()

      /**
       * register user via API
       */
      registerUser(user: UserLoginInfo): Chainable<Response<any>>

      /**
       * update user profile
       */
      updateProfile(userAccessToken: string, data: any): Chainable<Response<any>>

      /**
       * verify user OTP
       */
      verifyOTP(userAccessToken: string, data: any): Chainable<Response<any>>
    }
  }
}
