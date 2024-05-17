// exiting from RM screen is covered in detailed opportunitity rm scenario
import { ScheduleMeetingInput, User } from "cypress/support/types"
import timeZones from "../../support/timeZones"
import formatDate from "../../support/formatDate"
import { Helper } from "../../support/helper"
let supportKeys
let scheduleKeys
let commonKeys
let homeKeys
let timeZoneKeys
let faqs
let e2e
let expectedTimeZone
let inquiryEmail = "business.support@tfoco.com"
describe("Scheduling a call with TFO", () => {
  let user: User
  let meeting: ScheduleMeetingInput = {
    contactEmail: "",
    subject: "",
    content: "",
    startTime: "",
    endTime: "",
    timeZone: "",
    location: "",
    isOnlineMeeting: false,
  }
  let helper = new Helper()
  before(() => {
    cy.fixture(`../../locales/${Cypress.env('locale')}/support.json`).then((json) => { supportKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/common.json`).then((json) => { commonKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/scheduleMeeting.json`).then((json) => { scheduleKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/timeZones.json`).then((json) => { timeZoneKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/home.json`).then((json) => { homeKeys = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/faqs.json`).then((json) => { faqs = json })
    cy.fixture(`../../locales/${Cypress.env('locale')}/e2e.json`).then((json) => { e2e = json })
  })
  beforeEach(() => {
    helper.loginUser("hrk62bgfmh42f3cs@ethereal.email", "VnW4WTrssu9j5fwj1MM@d1010", true)
    helper.VisitUrl(e2e.urlPaths.support)
  })
   it("should able to contact client service ", () => {
    cy.intercept("/api/user").as("user")
    cy.visit(e2e.urlPaths.support, { timeout: 20000 })

    cy.wait("@user").then(({ response }) => {
      user = JSON.parse(JSON.stringify(response.body))
    })
    /* cy.intercept("/v2/track").as("track")
    cy.wait("@track", { timeout: 9000 })
      .wait(2000) */
    cy.findByRole("button", {
      name: supportKeys.card.contactClientService.title,
      timeout: 20000
    })
      .click()
      .then(() => {
        cy.findByPlaceholderText(commonKeys.textarea.placeholder).should(
          "have.attr",
          "maxlength",
          "300",
        )
      })
    })
   
     it("should able to close contact client service", () => {
      cy.findByRole("button", {
        name: supportKeys.card.contactClientService.title,
        timeout: 20000
      })
        .click()
        cy.get('.chakra-modal__close-btn').click()
  })

  it("Faqs should be visible", () => {
    cy.findByText(supportKeys.headings.faqs, { timeout: 20000 }).should("be.visible")
  })

  it("should display CTA to Schedule a call with CS for non-qualified user", () => {
    cy.findByRole("button", {
      name: supportKeys.card.talkWithExperts.title,
      timeout: 20000
    }).should("be.visible")
  })

  it("should display CTA to Schedule a call with RM for qualified user", () => {
    cy.findByRole("button", {
      name: supportKeys.card.contactClientService.title,
      timeout: 20000
    })
  })

  it("first faq accordian must be open by default", () => {
    cy.findByText(faqs[0].title).should("be.visible")
    cy.findByText(faqs[0].description).should("be.visible")
  })

  it("should able to expand and view all FAQs", () => {
    for (var i = 1; i < faqs.length; i++) {
      // expand accordian

      cy.findByText(faqs[i].title,{timeout:20000}).click()

      //if description is visible
      
      cy.contains(faqs[i].description,{timeout:20000}).should("be.visible")
    }
  })

  it("should view Email contact information", () => {
    cy.findByText(supportKeys.text.email,{timeout:20000})
      .parent()
      .siblings()
      .eq(0)
      .should("have.text", inquiryEmail)
  })

  it("should able to navigate back to dashboard", () => {
    helper.VisitUrl(e2e.urlPaths.dashboard)
    helper.VisitUrl(e2e.urlPaths.support)
    cy.findByRole("button", { name: commonKeys.button.back, timeout: 20000 }).click()
    cy.location("pathname").should("equal", e2e.urlPaths.dashboard, { timeout: 20000 })
  })

  it("should not allow user to enter more than 300 characters ", () => {
    cy.findByRole("button", { name: commonKeys.help.button.email, timeout: 20000 }).click()
    cy.findByPlaceholderText(commonKeys.textarea.placeholder).should(
      "have.attr",
      "maxlength",
      "300",
    )
  })
 
  it("should not be allowed to submit without text", () => {
    cy.findByRole("button", { name: commonKeys.help.button.email, timeout: 14000 }).click()
    cy.findByRole("button", { name: commonKeys.button.submit }).click()
    cy.findAllByText(commonKeys.errors.required).should("have.length", 2)
  }) 

  it("should able to submit email and see a confirmation message confirming that the message has been emailed.", () => {
    
      cy.findByText( commonKeys.help.button.email,{timeout:20000} ).click({force:true})
      cy.findByRole("group", { name: "reason" }).type(
        commonKeys.modal.reasons.learnMore.label,
      )
      cy.findByRole("button", {
        name: commonKeys.modal.reasons.learnMore.label,
      }).click()
    
      cy.findByPlaceholderText(commonKeys.textarea.placeholder).type(
       "TEST",
      )
      cy.findByRole("button", { name: commonKeys.button.submit }).click()
    
  })

  it("should see a confirmation message confirming that the message has been emailed.", () => {
    cy.findByText( commonKeys.help.button.email,{timeout:20000} ).click({force:true})
    cy.findByRole("group", { name: "reason" }).type(
      commonKeys.modal.reasons.learnMore.label,
    )
    cy.findByRole("button", {
      name: commonKeys.modal.reasons.learnMore.label,
    }).click()
  
    cy.findByPlaceholderText(commonKeys.textarea.placeholder).type(
     "TEST",
    )
    cy.findByRole("button", { name: commonKeys.button.submit }).click()
  
    cy.findByText(commonKeys.modal.emailSent.title,{timeout:20000}).should("be.visible")
  })
 
  it("should able to close email confirmation modal window using close icon", () => {
    cy.findByText( commonKeys.help.button.email,{timeout:20000} ).click({force:true})
    cy.findByRole("group", { name: "reason" }).type(
      commonKeys.modal.reasons.learnMore.label,
    )
    cy.findByRole("button", {
      name: commonKeys.modal.reasons.learnMore.label,
    }).click()
  
    cy.findByPlaceholderText(commonKeys.textarea.placeholder).type(
     "TEST",
    )
    cy.findByRole("button", { name: commonKeys.button.submit }).click()
  
 cy.get('.chakra-modal__close-btn').click()
    cy.findByRole("button", {
      name: supportKeys.card.contactClientService.title,
      timeout: 20000
    }).should('be.visible')
  })

  it("should able to close inquiry form using close icon", () => {
    cy.findByRole("button", { name: commonKeys.help.button.email }).click()
    cy.get('.chakra-modal__close-btn').click()
    cy.findByRole("button", { name: commonKeys.help.button.email }).should(
      "be.visible",
    )
  })
 

  it("should display validation error message when user has not filled required information", () => {
    cy.findByRole("button", {
      name: supportKeys.card.talkWithExperts.title,
      timeout: 20000
    }).should("be.visible")
    .click({ force: true })
    cy.intercept("/api/user").as("user")
    cy.visit(e2e.urlPaths.Schedule_Meeting)
      cy.wait("@user", { timeout: 30000 }).then(({ response }) => {
      user = JSON.parse(JSON.stringify(response.body))
    })
   /*  cy.intercept("/v2/track").as("track")
    cy.wait("@track", { timeout: 9000 }) */
    cy.findByRole("button", { name: scheduleKeys.button.call, timeout: 2000 }).click()
    cy.findAllByText(commonKeys.errors.required).should("have.length", 3)

    // meeting.location = user.profile.phoneNumber
    // cy.findByLabelText("phoneNumber").should(
    //   "have.value",
    //   user.profile.phoneNumber,
    // )
    // meeting.timeZone = timeZoneKeys["Arab-Standard-Time"]
    // expectedTimeZone = timeZones.find((t) => t.label === "Arab-Standard-Time")
    // cy.findAllByLabelText("timeZone")
    //   .eq(0)
    //   .should(
    //     "contains.text",
    //     `${timeZoneKeys["Arab-Standard-Time"]} ${expectedTimeZone.offset}`,
    //   )
    // let timeZone = e2e.alaskanTimeZone
    // meeting.timeZone = "GMT-09:00"
    // cy.findAllByLabelText("timeZone").children("div").eq(0).click()
    // cy.findByRole("button", {
    //   name: timeZone,
    // }).click()


    // cy.findByLabelText("availableDate").click()

    // cy.findByLabelText("availableDate")
    //   .get("div[aria-disabled='false']")
    //   .eq(1)
    //   .then((day) => {
    //     let selection = day.attr("aria-label").substring(7)
    //     meeting.startTime = `${formatDate(selection)}T15:00`
    //   })
    //   .click({ force: true })

    // cy.findByText(scheduleKeys.availableDate.label).click()
    // cy.wait(2000)
    // cy.findAllByLabelText("timeSlot").eq(3).click({ force: true })

    // meeting.subject = scheduleKeys.callReason.options.TFO
    // cy.findByLabelText("callReason")
    //   .findByText(commonKeys.select.placeholder)
    //   .click()
    // cy.findByRole("button", { name: meeting.subject }).click()

    // let content = Math.random().toString(36).slice(-5)
    // cy.findByLabelText(scheduleKeys.additionalInfo.label).type(content)

    // cy.findByLabelText(scheduleKeys.additionalInfo.label).should(
    //   "have.attr",
    //   "maxlength",
    //   "255",
    // )
    // const meetingDate = meeting.startTime.split("T")[0]

    // const startTime = meeting.startTime.split("T")[1]
    // cy.findByLabelText("callDetailsSummary").within(() => {
    //   cy.findByLabelText("date").should("contain.text", meetingDate)
   
    //   cy.findByLabelText("meetingType").should(
    //     "contain.text",
    //     scheduleKeys.meetingType.options.phoneCall,
    //   )
     
    //   cy.findByLabelText("reason").should("contain.text", meeting.subject)
    // })

    // meeting.isOnlineMeeting = true
    // cy.findAllByLabelText("meetingType")
    //   .findByText(scheduleKeys.meetingType.options.phoneCall)
    //   .click()
    // cy.findByRole("button", {
    //   name: scheduleKeys.meetingType.options.virtualMeeting,
    // }).click()

    // cy.findByLabelText("phoneNumber").should("not.exist")

    // meeting.location = user.email
    // cy.findByLabelText("email")
    //   .should("be.visible")
    //   .should("be.disabled")
    //   .should("have.value", user.email)

    // cy.findByLabelText("callDetailsSummary").within(() => {
    //   cy.findByLabelText("meetingType").should(
    //     "contain.text",
    //     meeting.isOnlineMeeting
    //       ? scheduleKeys.meetingType.options.virtualMeeting
    //       : scheduleKeys.meetingType.options.phoneCall,
    //   )
    //   cy.findByLabelText("contact").should(
    //     "contain.text",
    //     meeting.isOnlineMeeting ? user.email : meeting.location,
    //   )
    // })
    // cy.intercept("POST", "/api/portfolio/meetings/schedule").as(
    //   "scheduleResponse",
    // )

    // cy.findByRole("button", { name: scheduleKeys.button.call }).click()
    // cy.wait(5000)
    // cy.findByRole("heading", {
    //   name: scheduleKeys.success.title,
    //   timeout: 20000
    // }).should("be.visible")
    // cy.intercept("/api/user/relationship-manager", {
    //   fixture: "RMAssigned",
    // }).as("relationshipManager")
    // cy.findByRole("button", { name: scheduleKeys.button.close,timeout:10000 }).click({force:true})
   
  })
 

  it("should schedule meeting when RM is assigned to user", () => {
    cy.visit(e2e.urlPaths.Schedule_Meeting)




    cy.intercept("/api/user/relationship-manager", {
      fixture: "RMAssigned",
    }).as("relationshipManager")

    cy.visit(e2e.urlPaths.Schedule_Meeting)

    cy.wait("@relationshipManager")

    cy.fixture("RMAssigned").then((json) => {
      let rmAssigned = json.manager.firstName + " " + json.manager.lastName

      cy.findByLabelText("rmName").should("contain.text", rmAssigned)
    })

    let date = new Date()
    meeting.startTime = new Date(
      date.setDate(date.getDate()),
    ).toLocaleDateString("en-GB")
    meeting.timeZone = e2e.alaskanTimeZone
    cy.findAllByLabelText("timeZone").children("div").eq(0).click()
    cy.findByRole("button", {
      name: meeting.timeZone,
    }).click()

    cy.findByLabelText("availableDate").click()

    cy.findByLabelText("availableDate")
      .get("div[aria-disabled='false']")
      .eq(1)
      .then((day) => {
        let selection = day.attr("aria-label").substring(7)
        meeting.startTime = `${formatDate(selection)}T15:00`
      })
      .click()

    cy.findByText(scheduleKeys.availableDate.label).click()
    cy.findAllByLabelText("timeSlot").eq(3).click({ force: true })
    meeting.subject = scheduleKeys.callReason.options.TFO
    cy.findByLabelText("callReason")
      .findByText(commonKeys.select.placeholder)
      .click()
    cy.findByRole("button", { name: meeting.subject }).click()
    cy.intercept("POST", "/api/portfolio/meetings/schedule", {
      fixture: "schedulePayload",
    }).as("scheduleResponse")

    cy.findByRole("button", {
      name: scheduleKeys.button.call,
      timeout: 20000
    }).click()
    cy.wait("@scheduleResponse")
    cy.findByRole("heading", {
      name: scheduleKeys.success.title,
      timeout: 20000
    }).should("be.visible")

  })
  it("should schedule meeting when RM is assigned to user", () => {

   helper.verifyEmail("hrk62bgfmh42f3cs@ethereal.email")

  })
 })
