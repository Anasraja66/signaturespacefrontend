/* global grecaptcha */ // Declare grecaptcha as a global variable for ESLint
"use client"
import "./signup.css"
import { useState, useEffect, useRef } from "react"
import { X, ArrowLeft } from "lucide-react"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth, signInWithGoogle, sendEmailLink, isConfigured } from "../firebase"

export default function LoginPopup({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState("login")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [countryCode, setCountryCode] = useState("+92") // Default to Pakistan
  const [firebaseReady, setFirebaseReady] = useState(false)
  const [configError, setConfigError] = useState("")
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const codeInputRefs = useRef([])

  const actionCodeSettings = {
    url: window.location.origin + "/finishSignUp",
    handleCodeInApp: true,
  }

  // Check Firebase configuration on mount
  useEffect(() => {
    if (isConfigured() && auth) {
      setFirebaseReady(true)
      setConfigError("")
      console.log("Firebase is ready for Signature Space")
    } else {
      setConfigError("Firebase authentication is not available.")
      setFirebaseReady(false)
    }
  }, [])

  // --- reCAPTCHA Setup ---
  useEffect(() => {
    if (isOpen && currentStep === "login" && firebaseReady) {
      if (!auth) {
        console.error("Firebase Auth instance is not available. Cannot initialize reCAPTCHA.")
        return
      }

      // Clean up any existing reCAPTCHA
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear()
        } catch (e) {
          console.log("Error clearing existing reCAPTCHA:", e)
        }
        delete window.recaptchaVerifier
      }

      // Clear the container
      const container = document.getElementById("recaptcha-container")
      if (container) {
        container.innerHTML = ""
      }

      console.log("Initializing reCAPTCHA verifier for Signature Space...")

      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response)
            setRecaptchaReady(true)
            setConfigError("") // Clear any previous errors
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please try again.")
            setRecaptchaReady(false)
            setConfigError("Security verification expired. Please complete it again.")
          },
          "error-callback": (error) => {
            console.error("reCAPTCHA error:", error)
            setRecaptchaReady(false)
            setConfigError("Security verification failed. Please refresh and try again.")
          },
        })

        window.recaptchaVerifier
          .render()
          .then((widgetId) => {
            console.log("reCAPTCHA widget rendered with ID:", widgetId)
            window.recaptchaVerifier.widgetId = widgetId
            setRecaptchaReady(true)
            setConfigError("") // Clear any previous errors
          })
          .catch((renderError) => {
            console.error("Error rendering reCAPTCHA widget:", renderError)
            setRecaptchaReady(false)

            if (
              renderError.code === "auth/invalid-app-credential" ||
              renderError.message.includes("Invalid site key")
            ) {
              setConfigError(
                "Phone authentication is not properly configured. Please complete the Firebase setup steps below.",
              )
            } else if (renderError.message.includes("not loaded")) {
              setConfigError("reCAPTCHA failed to load. Please check your internet connection and refresh the page.")
            } else {
              setConfigError("Security verification setup failed. Please refresh the page and try again.")
            }
          })
      } catch (error) {
        console.error("Error creating reCAPTCHA verifier:", error)
        setRecaptchaReady(false)
        setConfigError("Security verification is not available. Please check your internet connection.")
      }
    } else if (!isOpen && window.recaptchaVerifier) {
      try {
        if (window.grecaptcha && window.grecaptcha.reset && window.recaptchaVerifier.widgetId) {
          window.grecaptcha.reset(window.recaptchaVerifier.widgetId)
        }
        window.recaptchaVerifier.clear()
      } catch (e) {
        console.log("Error cleaning up reCAPTCHA:", e)
      }
      delete window.recaptchaVerifier
      setRecaptchaReady(false)
      console.log("reCAPTCHA verifier cleaned up.")
    }
  }, [isOpen, currentStep, firebaseReady, auth])

  // --- Google Sign-In ---
  const handleGoogleSignIn = async () => {
    if (!firebaseReady) {
      setConfigError("Authentication service is not available. Please check your configuration.")
      return
    }

    setLoading(true)
    setConfigError("")
    try {
      const result = await signInWithGoogle()
      const user = result.user
      const idToken = await user.getIdToken()
      // Send user data to Django backend
      fetch('http://localhost:8000/api/accounts/firebase-login-simple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken, name: user.displayName || "" })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Backend response:", data)
          // Optionally show success/failure to user
        })
        .catch(err => {
          console.error("Backend error:", err)
        })
      alert("Successfully signed in with Google!")
      onClose()
    } catch (error) {
      console.error("❌ Google sign-in error:", error.code, error.message)
      if (error.code === "auth/popup-blocked") {
        setConfigError("Pop-up was blocked. Please allow pop-ups for this site and try again.")
      } else if (error.code === "auth/popup-closed-by-user") {
        setConfigError("Sign-in was cancelled. Please try again.")
      } else {
        setConfigError(`Failed to sign in with Google: ${error.message || error.code}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // --- Email Link Sign-In ---
  const handleEmailLinkSignIn = async () => {
    if (!firebaseReady) {
      setConfigError("Authentication service is not available. Please check your configuration.")
      return
    }

    setLoading(true)
    setConfigError("")
    if (!isValidEmail(email)) {
      setConfigError("Please enter a valid email address.")
      setLoading(false)
      return
    }
    try {
      await sendEmailLink(email, actionCodeSettings)
      window.localStorage.setItem("emailForSignIn", email)
      // After user clicks link in email, handle sign-in and send to backend (see below)
      alert("Check your email for the sign-in link.")
      setEmail("")
      onClose()
    } catch (error) {
      console.error("Error sending email link:", error)
      setConfigError(`Failed to send email link: ${error.message || error.code}`)
    } finally {
      setLoading(false)
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // --- Phone Authentication - Send SMS ---
  const handleSendSMS = async () => {
    if (!firebaseReady) {
      setConfigError("Authentication service is not available. Please check your configuration.")
      return
    }

    if (!recaptchaReady || !window.recaptchaVerifier) {
      setConfigError("Please complete the security verification (reCAPTCHA) first.")
      return
    }

    setLoading(true)
    setConfigError("")
    const fullPhoneNumber = countryCode + phoneNumber
    if (!fullPhoneNumber.match(/^\+\d{10,15}$/)) {
      setConfigError("Please enter a valid phone number (e.g., 3001234567).")
      setLoading(false)
      return
    }

    try {
      const result = await signInWithPhoneNumber(auth, fullPhoneNumber, window.recaptchaVerifier)
      setConfirmationResult(result)
      setCurrentStep("smsConfirmation")
      alert("Verification code sent to your phone!")
    } catch (error) {
      console.error("Error sending SMS:", error)
      let errorMessage = "Failed to send verification code. Please try again."

      if (error.code === "auth/invalid-phone-number") {
        errorMessage = "The phone number provided is invalid."
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later."
      } else if (error.code === "auth/captcha-check-failed") {
        errorMessage = "Security check failed. Please complete the reCAPTCHA and try again."
      } else if (error.code === "auth/invalid-app-credential") {
        errorMessage =
          "Phone authentication is not properly configured in Firebase. Please check the setup instructions."
      } else if (error.message.includes("Invalid site key")) {
        errorMessage = "reCAPTCHA configuration error. Please check Firebase phone authentication setup."
      }

      setConfigError(errorMessage)
      setRecaptchaReady(false)

      // Reset reCAPTCHA
      if (window.grecaptcha && window.grecaptcha.reset && window.recaptchaVerifier?.widgetId) {
        window.grecaptcha.reset(window.recaptchaVerifier.widgetId)
      }
    } finally {
      setLoading(false)
    }
  }

  // --- Phone Authentication - Verify SMS Code ---
  const handleVerifySMSCode = async () => {
    if (!firebaseReady) {
      setConfigError("Authentication service is not available. Please check your configuration.")
      return
    }

    setLoading(true)
    setConfigError("")
    const code = verificationCode.join("")
    if (code.length !== 6) {
      setConfigError("Please enter the full 6-digit code.")
      setLoading(false)
      return
    }
    if (!confirmationResult) {
      setConfigError("No verification process initiated. Please send a code first.")
      setLoading(false)
      return
    }
    try {
      const result = await confirmationResult.confirm(code)
      const user = result.user
      const idToken = await user.getIdToken()
      // Name fallback logic
      const safeName =
        user.displayName ||
        user.name ||
        user.phoneNumber ||
        user.email ||
        "Unknown"
      console.log("idToken:", idToken, "name:", safeName) // Debug log
      // Send user data to Django backend
      fetch('http://localhost:8000/api/accounts/firebase-login-simple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken, name: safeName })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Backend response:", data)
          // Optionally show success/failure to user
        })
        .catch(err => {
          console.error("Backend error:", err)
        })
      alert("Successfully signed in with phone number!")
      setPhoneNumber("")
      setVerificationCode(["", "", "", "", "", ""])
      setConfirmationResult(null)
      onClose()
    } catch (error) {
      console.error("❌ Error verifying SMS code:", error)
      let errorMessage = "Incorrect or expired code. Please try again."
      if (error.code === "auth/invalid-verification-code") {
        errorMessage = "The verification code is incorrect."
      } else if (error.code === "auth/code-expired") {
        errorMessage = "The verification code has expired. Please request a new one."
      }
      setConfigError(errorMessage)
      setVerificationCode(["", "", "", "", "", ""])
      if (codeInputRefs.current[0]) {
        codeInputRefs.current[0].focus()
      }
    } finally {
      setLoading(false)
    }
  }

  // --- SMS Code Input Handlers ---
  const handleCodeInputChange = (e, index) => {
    const { value } = e.target
    if (value.length > 1 || (value.length === 1 && !/[0-9]/.test(value))) {
      return
    }
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
    if (value && index < 5) {
      codeInputRefs.current[index + 1].focus()
    }
  }

  const handleCodeInputKeyDown = (e, index) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1].focus()
    }
  }

  if (!isOpen) return null

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          {(currentStep === "smsConfirmation" || currentStep === "email") && (
            <button
              className="popup-back-button"
              onClick={() => {
                setCurrentStep("login")
                setPhoneNumber("")
                setEmail("")
                setVerificationCode(["", "", "", "", "", ""])
                setConfirmationResult(null)
                setConfigError("")
                setRecaptchaReady(false)
              }}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <button className="popup-close-button" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
          <h2 className="popup-title">
            {currentStep === "login"
              ? "Log in or sign up"
              : currentStep === "smsConfirmation"
                ? "Confirm your number"
                : "Sign up with Email"}
          </h2>
        </div>
        <div className="popup-body">
          {currentStep === "login" && (
            <>
              <h1 className="welcome-heading">Welcome to Signature Space</h1>

              {!firebaseReady && (
                <div className="config-warning">
                  <h3>🔧 Firebase Setup Required</h3>
                  <p>To enable phone authentication, please complete these steps:</p>
                  <ol>
                    <li>
                      Go to{" "}
                      <a
                        href="https://console.firebase.google.com/project/signaturespacesignup/authentication/providers"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Firebase Authentication
                      </a>
                    </li>
                    <li>
                      Enable the <strong>Phone</strong> sign-in method
                    </li>
                    <li>
                      Add <code>localhost</code> to{" "}
                      <a
                        href="https://console.firebase.google.com/project/signaturespacesignup/authentication/settings"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Authorized domains
                      </a>
                    </li>
                    <li>
                      Enable <strong>Google</strong> and <strong>Email/Password</strong> providers
                    </li>
                  </ol>
                </div>
              )}

              {configError && (
                <div className="error-message" role="alert">
                  {configError}
                  {configError.includes("Phone authentication is not properly configured") && (
                    <div style={{ marginTop: "8px", fontSize: "12px" }}>
                      <strong>Quick Fix:</strong> Go to{" "}
                      <a
                        href="https://console.firebase.google.com/project/signaturespacesignup/authentication/providers"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2" }}
                      >
                        Firebase Console
                      </a>{" "}
                      and enable Phone authentication.
                    </div>
                  )}
                </div>
              )}

              <div className="input-group">
                <div className="country-code-input">
                  <div className="input-label">Country code</div>
                  <select
                    id="countryCode"
                    name="countryCode"
                    className="input-field"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={!firebaseReady}
                  >
                    <option value="+92">Pakistan (+92)</option>
                  </select>
                </div>
                <div>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="Phone number (e.g., 3001234567)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={!firebaseReady}
                  />
                </div>
              </div>
              <p className="privacy-text">
                {"We'll call or text you to confirm your number. Standard message and data rates apply. "}
                <span className="privacy-link">Privacy Policy</span>
              </p>

              {/* reCAPTCHA container - always show for better UX */}
              <div className="recaptcha-container">
                <div id="recaptcha-container"></div>
                {!recaptchaReady && firebaseReady && (
                  <div className="recaptcha-loading">
                    <p>Loading security verification...</p>
                  </div>
                )}
              </div>

              <button
                className="continue-button"
                onClick={handleSendSMS}
                disabled={!phoneNumber || loading || !firebaseReady || !recaptchaReady}
              >
                {loading
                  ? "Sending SMS..."
                  : !firebaseReady
                    ? "Setup Required"
                    : !recaptchaReady
                      ? "Complete Security Check"
                      : "Continue"}
              </button>

              <div className="or-separator">or</div>
              <button className="social-button" onClick={handleGoogleSignIn} disabled={loading || !firebaseReady}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              <button className="social-button" disabled={loading || !firebaseReady}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1778F2">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                Continue with Apple
              </button>
              <button
                className="social-button"
                onClick={() => setCurrentStep("email")}
                disabled={loading || !firebaseReady}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={25} width={25}>
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                Continue with email
              </button>
              <button className="social-button" disabled={loading || !firebaseReady}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continue with Facebook
              </button>
            </>
          )}
          {currentStep === "email" && (
            <>
              <h1 className="welcome-heading">Sign up with Email</h1>

              {configError && (
                <div className="error-message" role="alert">
                  {configError}
                </div>
              )}

              <div className="input-group">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!firebaseReady}
                />
              </div>
              <p className="privacy-text">
                {"We'll send you a confirmation email. "}
                <span className="privacy-link">Privacy Policy</span>
              </p>
              <button
                className="continue-button"
                disabled={!isValidEmail(email) || loading || !firebaseReady}
                onClick={handleEmailLinkSignIn}
              >
                {loading ? "Sending..." : firebaseReady ? "Continue" : "Setup Required"}
              </button>
            </>
          )}
          {currentStep === "smsConfirmation" && (
            <>
              <p className="privacy-text" style={{ fontSize: "16px", color: "#222222", marginBottom: "20px" }}>
                Enter the code we sent over SMS to {countryCode} {phoneNumber}:
              </p>

              {configError && (
                <div className="error-message" role="alert">
                  {configError}
                </div>
              )}

              <div className="sms-code-input-container">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="sms-code-input"
                    placeholder="-"
                    value={verificationCode[index]}
                    onChange={(e) => handleCodeInputChange(e, index)}
                    onKeyDown={(e) => handleCodeInputKeyDown(e, index)}
                    ref={(el) => (codeInputRefs.current[index] = el)}
                    aria-label={`SMS code digit ${index + 1}`}
                    autoFocus={index === 0}
                    disabled={!firebaseReady}
                  />
                ))}
              </div>
              <button
                className="choose-option-link"
                onClick={() => {
                  setCurrentStep("login")
                  setPhoneNumber("")
                  setVerificationCode(["", "", "", "", "", ""])
                  setConfirmationResult(null)
                  setConfigError("")
                  setRecaptchaReady(false)
                }}
              >
                Choose a different option
              </button>
              <button
                className="continue-button"
                onClick={handleVerifySMSCode}
                disabled={verificationCode.join("").length !== 6 || loading || !firebaseReady}
              >
                {loading ? "Verifying..." : firebaseReady ? "Verify Code" : "Setup Required"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
