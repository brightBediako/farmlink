import nodemailer from "nodemailer";

export const sendUpdateNotificationEmail = async (to, fullname) => {
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
      to: to,
      subject: "FarmLink – Email Update Successfully!",
      html: `<p>Hi ${fullname}, 👋</p>

            <p> You can now log in with your new email address.</p>

            <br>

            <p>– The <strong>FarmLink Team</strong> 💚</p>
            `,
    };
    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error("Notification not sent");
  }
};
