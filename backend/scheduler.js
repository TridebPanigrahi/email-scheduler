const corn = require("node-cron");
const Email = require("./models/Email");
const { sendEmail } = require("./controllers/email");
corn.schedule("* * * * *", async () => {
  const now = new Date();
  console.log("✅ Cron job started at:", new Date().toLocaleString());

  const emails = await Email.find({
    scheduledTime: { $lte: now },
    status: "Pending",
  }).lean();

  console.log("📧 Emails found:", emails.length);

  if (emails) {
    for (let email of emails) {
      await sendEmail(email.to, email.subject, email.body);
      await Email.updateOne(
        {
          _id: email._id,
        },
        { status: "Sent" },
      );
    }
  }
});
