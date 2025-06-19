import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (to, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      to,
      subject: "FarmLink | Password Reset Code",
      html: `<p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`,
      // html: `<p>Click <a href="${process.env.FRONTEND_URL}/verify-email/${token}">here</a> to verify your email account.</p>`,
    };
    const info = await transporter.sendMail(message);
    // console.log("Email sent successfully", info.messageId);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error("Email not sent");
  }
};
