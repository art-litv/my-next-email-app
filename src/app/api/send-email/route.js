// app/api/send-email/route.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const subject = formData.get("subject");
    const text = formData.get("text");
    const to = formData.get("to");
    const file = formData.get("file");

    const mailOptions = {
      from: "sender@freelance.mailtrap.link",
      to,
      subject,
      text,
    };

    if (file) {
      const buffer = await file.arrayBuffer();
      mailOptions.attachments = [
        {
          filename: file.name,
          content: Buffer.from(buffer),
          contentType: file.type,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error sending email", error }),
      { status: 500 }
    );
  }
}
