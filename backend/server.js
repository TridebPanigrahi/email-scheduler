require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");
require("./scheduler");

const app = express();

app.use(cors());

// Route middleware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Email Scheduler Backend Running 🚀");
});

// connect DB
async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
}

connectDb();

app.use("/api/email", emailRoutes);
