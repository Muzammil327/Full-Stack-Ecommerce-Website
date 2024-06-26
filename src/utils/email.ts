import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});
4;
export async function sendActivationEmail(email: string, token: string) {
  const activationLink = `${process.env.NEXT_PUBLIC_FRONTENDPI}/activate/${token}`;
  const message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Activate your account",
    text: `Click this link to activate your account: ${activationLink}`,
    html: `
    <h1>Welcome to SMI Store</h1>
    <p>Click <a href="${activationLink}">here</a> to activate your account.</p>
    `,
  };

  await transporter.sendMail(message);
}
