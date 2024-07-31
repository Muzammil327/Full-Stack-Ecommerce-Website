import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: process.env.EMAIL_SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});

export async function sendActivationEmail(
  email: string,
  token: string,
  username: string
) {
  const activationLink = `${process.env.NEXT_PUBLIC_FRONTENDPI}/activate/${token}`;
  const message = {
    from: "SMI Store",
    to: email,
    subject: "Activate Your SMI Store Account",
    text: `Click this link to activate your account: ${activationLink}`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to SMI Store!</h1>
          </div>
          <div class="content">
            <p>Hello, ${username}</p>
            <p>Thank you for signing up at SMI Store. To complete your registration, please click the button below to activate your account:</p>
            <a href="${activationLink}" class="button">Activate Your Account</a>
            <p>If you did not create an account with us, please ignore this email.</p>
            <p>Best regards,<br>The SMI Store Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} SMI Store. All rights reserved.</p>
            <p>If you have any questions, contact us at <a href="mailto:smistore528982@gmail.com">smistore528982@gmail.com</a></p>
          </div>
        </div>
      </body>
    </html>
    `,
  };

  await transporter.sendMail(message);
}
