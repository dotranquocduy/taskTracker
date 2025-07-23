import 'dotenv/config';
const nodemailer = require("nodemailer");

require('dotenv').config()


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

// Wrap in an async IIFE so we can use await.
export async function sendVerificationEmail(to: string | null, code : string | null)  {
  const info = await transporter.sendMail({
    from: `"your App web" <${process.env.EMAIL_USER}>`, // sender address
    to,
    subject: "Mã xác nhận đăng ký ✔",
    html: `<p>Mã xác nhận của bạn là: <b>${code}</b> </p>`, // HTML body
  });
  console.log('✅ Email sent to:', to);
  console.log("Message sent:", info.messageId);
};  