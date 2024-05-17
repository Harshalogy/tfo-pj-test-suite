# cypress-e2e-tests

This repo contains e2e tests written in Cypress for Petiole - Prospect Journey

---
---

## Introduction to Cypress

Cypress is a relatively new automated tests tool which is gaining popularity at a very rapid pace

Here is the home page for Cypress if someone wants to look it up

<https://www.cypress.io/>

Cypress has very strong documentation so a new comer could find most of the information from their own site

<https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell>

Also as a starting point it would be good to go through these tutorial videos

<https://docs.cypress.io/examples/examples/tutorials.html#Best-Practices>

---
---

## Test Setup

### Installations

You need to have Node.js(latest recommended version)(https://nodejs.org/en/) installed before using Cypress.

For rest of the installations move to project folder in command prompt and type

`npm install`

which will install Cypress and other supporting tools

---
---

### Test Setup

To set `ENVIRONMENT` for the execution

set env variable ENVIRONMENT='qa' || 'Dev' || 'Prod' ,  Default: 'qa'

To set `LOCALE` for the execution, Default: 'en-CH'

set env variable LOCALE='en-CH'  -> For test execution  on english version

set env variable LOCALE='de-CH'  -> For german version

### Run Tests

To run the test in local and headed mode use following command to launch the Cypress runner

`npm run e2e`

To run test in headless mode use the following command

`npm run e2e:headless`


To run test in headless mode and render the results in cypress dashboard use the following command

https://dashboard.cypress.io/projects/1sk8gp/runs

`npm run e2e:dashboard`

### Using ES LInt

ESLint is also setup in the repo, you can use it by typing following command in terminal

`npm run lint`


