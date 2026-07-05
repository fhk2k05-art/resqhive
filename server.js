const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(__dirname));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});
transporter.verify(function(error, success) {
    if (error) {
        console.log("EMAIL ERROR:", error);
    } else {
        console.log("EMAIL SERVER READY");
    }
});

// Contact Form API
app.post("/send-message", async (req, res) => {

    const { name, email, service, subject, message } = req.body;

    try {

      console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "FOUND" : "NOT FOUND");

console.log("Starting email send...");

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "fhk2k05@gmail.com",
    subject: `ResQHive Contact Form - ${subject}`,
    html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `
});

console.log("Email sent successfully");

     console.log("Email sent successfully");

res.status(200).json({
    success: true,
    message: "Message sent successfully!"
});
    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });

    }

});

// Server Start
app.listen(PORT, () => {

    console.log(`
=========================================
🚀 ResQHive Technologies Server Running
🌐 Frontend: http://localhost:${PORT}
📨 API:      http://localhost:${PORT}/send-message
=========================================
`);

});
