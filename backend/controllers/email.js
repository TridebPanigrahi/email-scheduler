const express = require("express");
const Email = require("../models/Email");

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

module.exports = {
  scheduledEmail,
};
