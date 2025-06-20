import nodemailer from "nodemailer";

export const sendProductNotificationEmail = async (to, productId, messageText) => {
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
      subject: "FarmLink | New Product Created",
      html: `<p>${messageText}</p>

<p>
  👉 
  <a 
    href="https://brightbediako.netlify.app/products/${productId}" 
    style="color: #1a73e8; text-decoration: none; font-weight: bold;" 
    target="_blank"
  >
    View Product
  </a>
</p>
`,
    };
    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error("Notification not sent");
  }
};
