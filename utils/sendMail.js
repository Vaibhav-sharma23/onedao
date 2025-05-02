import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async ({ sendTo, subject, text, html }) => {
  await transporter.sendMail({
    from: `"Onedao" <${process.env.MAIL_USER}>`,
    to: sendTo,
    subject,
    text,
    html,
  });
};

export default sendMail;
