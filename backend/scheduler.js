const corn = require("node-cron");
const Email = require("./models/Email");
const { sendEmail } = require("./controllers/email");

corn.schedule("* * * * *", async () => {
  const now = new Date();
  const emails = await Email.find({
    scheduledTime: { $lte: now },
    status: "Pending",
  }).lean();

  if (emails) {
    for (let email of emails) {
      await sendEmail(email.to, email.subject, email.body);
      email.status = "sent";
      await email.save();
    }
  }
});
