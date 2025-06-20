import nodemailer from "nodemailer";

export const sendVendorNotificationEmail = async (to, farmName) => {
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
      html: `<p>Hi ${farmName}, 👋</p>

            <p>
              ✅ Your Vendor account has been <strong>created successfully</strong>. You can now log in and start selling on the platform.
            </p>

            <p>
              We're excited to have you on board! 🎉
            </p>

            <p>
              🤝 If you have any questions or need help, feel free to reply to this email or reach out to our support team.
            </p>

            <p>
              🌱 Happy selling!
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
