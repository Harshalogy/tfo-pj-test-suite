import { defineConfig } from "cypress"
import fs from "fs-extra"
import path from "path"
import encrypt from "cypress/support/encrypt"
import getLastUserEmail from "cypress/support/getLastEmail"
import { beforeRunHook, afterRunHook } from "cypress-mochawesome-reporter/lib"
import { tagify } from 'cypress-tags';

export default defineConfig({
  projectId: "wb1tiv",
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  requestTimeout: 10000,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 20000,
  responseTimeout: 20000,
  retries: { openMode: 0, runMode: 3 },
  chromeWebSecurity: false,

  env: {
    ENVIRONMENT: "qa"
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml",
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
    },
  },
  videoCompression: 15,
  //trashAssetsBeforeRuns: true,
  e2e: {
    async setupNodeEvents(on, config) {
      const file = config.env.ENVIRONMENT || "qa"
      const locale = config.env.LOCALE || "en"
      config = await getConfigurationByFile(file)
      config.env.locale = locale
      require("cypress-mochawesome-reporter/plugin")(on)
      on('file:preprocessor', tagify(config))
      on("task", {
        encrypt,
        getLastUserEmail,
        setUserData: (userData: any) => {
          global.userData = userData;
          console.log(global.userData)
          return null;
        },
        getUserData: (): any => {
          console.log(global.userData)
          return global.userData;
        },
      })
      on("before:run", async (details) => {
        console.log("override before:run")
        await beforeRunHook(details)
      })



      on("after:run", async () => {
        console.log("override after:run")
        await afterRunHook()
      })
      return config
    },
    experimentalModifyObstructiveThirdPartyCode: true
  },
})

async function getConfigurationByFile(file: any) {
  const pathToConfigFile = path.resolve(
    __dirname,
    "cypress/config",
    `${file}.json`,
  )

  fs.readJson(pathToConfigFile)

  return fs.readJson(pathToConfigFile)
}

