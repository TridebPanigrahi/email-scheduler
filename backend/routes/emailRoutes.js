const express = require("express");
const { scheduledEmail } = require("../controllers/email");
const route = express.Router();

//post email

route.post("/schedule", scheduledEmail);

module.exports = route;
