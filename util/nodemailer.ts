import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "e1edf7e4c9ed21",
    pass: "c1dcf8b91a4176",
  },
});

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetUrl = `http://localhost:7000/user/reset-password?token=${token}`;
  const mailOptions = {
    from: "abbasali.sheru@ecosmob.com",
    to: email,
    subject: "Reset your password",
    html: `
      <p>Hi,</p>
      <p>We received a request to reset your password. Please click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset password</a></br>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};
