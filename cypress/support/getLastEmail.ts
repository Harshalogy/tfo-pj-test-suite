import imaps from "imap-simple"
const simpleParser = require("mailparser").simpleParser

export default async function getLastUserEmail(
  account: any,
): Promise<{ subject: any; text: any; html: any; inboxMailCount: number }> {
  const emailConfig = {
    imap: {
      user: account.email,
      password: account.password,
      host: "imap.ethereal.email",
      port: 993,
      tls: true,
      authTimeout: 10000,
    },
  }

  console.log("getting the last email")

  try {
    const connection = await imaps.connect(emailConfig)

    await connection.openBox("INBOX")
    const searchCriteria = ["1:3"]

    const fetchOptions = {
      bodies: [""],
    }

    const messages = await connection.search(searchCriteria, fetchOptions)

    connection.end()

    if (!messages.length) {
      console.log("cannot find any emails")
      return null
    } else {
      console.log("there are %d messages", messages.length)

      const mail = await simpleParser(
        messages[messages.length - 1].parts[0].body,
      )

      return {
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        inboxMailCount: messages.length,
      }
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
