import resend from "../config/resend.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !email || !message) {
    throw new AppError("Name, phone, email and message are required", 400);
  }

  await resend.emails.send({
    from: "Moon Battery and Tyre <onboarding@resend.dev>",
    to: "fk9719650@gmail.com",
    subject: `New contact form message${subject ? `: ${subject}` : ""}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  res.status(200).json({ message: "Message sent successfully" });
});