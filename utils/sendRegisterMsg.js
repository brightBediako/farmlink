import nodemailer from "nodemailer";

export const sendRegisterMsg = async (to, messageText, fullname) => {
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
      subject: "Welcome to FarmLink – Your Account Was Created Successfully!",
      html: `<p>Hi ${fullname}, 👋</p>

            <p>
              ✅ Your account has been <strong>created successfully</strong>. You can now log in and start exploring the platform.
            </p>

            <p>
              🚜 Whenever you're ready, you can also become a <strong>vendor</strong> and start selling your own farm products with just a click.
            </p>

            <p>
              We're excited to have you on board! 🎉
            </p>

            <p>
              🤝 If you have any questions or need help, feel free to reply to this email or reach out to our support team.
            </p>

            <p>
              🌱 Happy farming!
            </p>

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
