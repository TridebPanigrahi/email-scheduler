const express = require("express");
const Email = require("../models/Email");
const ses = require("../config/aws");

async function scheduledEmail(req, res) {
  const { to, subject, body, scheduledTime } = req.body;
  const email = new Email({
    to,
    subject,
    body,
    scheduledTime,
  });
  await email.save();
  res.json({ message: "Email Scheduled Successfully" });
}

async function sendEmail(to, subject, body) {
  const params = {
    Source: "panigrahitrideb1@gmail.com",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: body } },
    },
  };
  return ses.sendEmail(params).promise();
}

module.exports = {
  scheduledEmail,
  sendEmail,
};
