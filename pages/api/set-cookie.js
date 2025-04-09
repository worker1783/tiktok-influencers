export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    // Set the cookie with HttpOnly
    res.setHeader("Set-Cookie", "sensitiveCookie=secretValue123; Path=/; SameSite=Lax; HttpOnly; Secure");
  
    res.status(200).json({ message: "Cookie set successfully" });
  }