const mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  scheduledTime: Date,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Email", EmailSchema);
