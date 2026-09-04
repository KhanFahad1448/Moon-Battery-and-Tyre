import resend from "../config/resend.js";

// Using Resend's shared test domain until a custom domain is verified.
// Before verification, Resend only delivers to the email the Resend
// account itself was signed up with — real customers won't receive these
// yet. Once a custom domain is verified in Resend's dashboard, just change
// FROM_ADDRESS below to something like "Moon Battery and Tyre <orders@yourdomain.com>".
const FROM_ADDRESS = "Moon Battery and Tyre <onboarding@resend.dev>";

const ADMIN_EMAIL = "fk9719650@gmail.com";



const wrapper = (title, bodyHtml) => `
  <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
    <div style="background: linear-gradient(135deg, #ff6a1a, #ff8c42); padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 0.05em;">MOON BATTERY AND TYRE</h1>
    </div>
    <div style="background: #f9f9f9; padding: 28px 24px; border-radius: 0 0 8px 8px;">
      <h2 style="margin-top: 0; font-size: 18px;">${title}</h2>
      ${bodyHtml}
      <p style="margin-top: 28px; font-size: 12px; color: #888;">
        Questions? Just reply to this email or reach us on WhatsApp.
      </p>
    </div>
  </div>
`;

async function sendEmail({ to, subject, html }) {
  try {
    await resend.emails.send({ from: FROM_ADDRESS, to, subject, html });
  } catch (err) {
    console.error("Email send failed:", err.message);
  }
}


// Sending Order Confirmation to Customer
export async function sendOrderConfirmationEmail(order) {
  const itemsHtml = order.items
    .map((i) => `<li>${i.name} × ${i.qty} — ₹${(i.price * i.qty).toLocaleString("en-IN")}</li>`)
    .join("");

  const html = wrapper(
    "Order confirmed",
    `
      <p>Hi ${order.name}, thanks for your order! Here's a summary:</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <ul style="padding-left: 20px;">${itemsHtml}</ul>
      <p><strong>Total: ₹${order.total.toLocaleString("en-IN")}</strong> (${order.method})</p>
      <p>Delivering to: ${order.address}, ${order.city}, ${order.state} ${order.pin}</p>
      <p>We'll keep you updated as your order moves through fitting and dispatch.</p>
    `
  );

  await sendEmail({ to: order.email, subject: `Order confirmed — ${order.orderId}`, html });
}


// Sending Booking Confirmation to Customer
export async function sendBookingConfirmationEmail(booking, customerEmail) {
  const html = wrapper(
    "Booking requested",
    `
      <p>Hi ${booking.name}, we've received your service booking request:</p>
      <p><strong>Branch:</strong> ${booking.branch}</p>
      <p><strong>Date & time:</strong> ${booking.date} at ${booking.time}</p>
      <p><strong>Vehicle:</strong> ${booking.vehicle} (${booking.regNumber})</p>
      <p>Our counter will confirm your slot shortly. You can track its status anytime from your account.</p>
    `
  );

  await sendEmail({ to: customerEmail, subject: "Your service slot request", html });
}




//Sending Booking Notification to Admin
export async function sendAdminBookingNotification(booking) {
  const html = wrapper(
    "New booking request",
    `
      <p>A new service booking just came in:</p>
      <p><strong>Customer:</strong> ${booking.name} · ${booking.phone}</p>
      <p><strong>Branch:</strong> ${booking.branch}</p>
      <p><strong>Date & time:</strong> ${booking.date} at ${booking.time}</p>
      <p><strong>Vehicle:</strong> ${booking.vehicle} (${booking.regNumber})</p>
      ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
      <p>Log in to the admin dashboard to confirm this slot.</p>
    `
  );

  await sendEmail({ to: ADMIN_EMAIL, subject: `New booking — ${booking.name}`, html });
}



// Sending Order Notification to Admin
export async function sendAdminOrderNotification(order) {
  const itemsHtml = order.items
    .map((i) => `<li>${i.name} × ${i.qty} — ₹${(i.price * i.qty).toLocaleString("en-IN")}</li>`)
    .join("");

  const html = wrapper(
    "New order placed",
    `
      <p>A new order just came in:</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Customer:</strong> ${order.name} · ${order.phone} · ${order.email}</p>
      <ul style="padding-left: 20px;">${itemsHtml}</ul>
      <p><strong>Total: ₹${order.total.toLocaleString("en-IN")}</strong> (${order.method})</p>
      <p>Delivering to: ${order.address}, ${order.city}, ${order.state} ${order.pin}</p>
      <p>Log in to the admin dashboard to process this order.</p>
    `
  );

  await sendEmail({ to: ADMIN_EMAIL, subject: `New order — ${order.orderId}`, html });
}



// Sending Review Notification to Admin
export async function sendAdminReviewNotification(testimonial) {
  const html = wrapper(
    "New review awaiting approval",
    `
      <p>A customer just submitted a review:</p>
      <p><strong>Name:</strong> ${testimonial.name}</p>
      ${testimonial.car ? `<p><strong>Car:</strong> ${testimonial.car}</p>` : ""}
      ${testimonial.city ? `<p><strong>City:</strong> ${testimonial.city}</p>` : ""}
      <p><strong>Rating:</strong> ${testimonial.rating} / 5</p>
      <p><strong>Quote:</strong> "${testimonial.quote}"</p>
      <p>Log in to the admin dashboard to approve or reject it.</p>
    `
  );

  await sendEmail({ to: ADMIN_EMAIL, subject: `New review from ${testimonial.name}`, html });
}



