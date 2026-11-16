
const nodemailer = require("nodemailer");
const textforemial = require("../template/email");

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
});

// Send OTP email
const sendEmail = async function ({ email, otp}) {
  try {
    const mailoptions = {
      from: {
        name: "TXO Company",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: `TXO | Your OTP Code for verification`,
      html: textforemial(otp, type),
    };

    const info = await transporter.sendMail(mailoptions);

    console.log("Email sent successfully:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };

  } catch (error) {
    console.error("Email sending failed:", error.message);

    throw new Error("Unable to send OTP email");
  }
};

module.exports = sendEmail;
