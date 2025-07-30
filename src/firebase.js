import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  sendSignInLinkToEmail,
} from "firebase/auth"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDI5LxTK8gIwM1iTJsE--OT7cdUxRXEwFg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "signaturespacesignup.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "signaturespacesignup",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "signaturespacesignup.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "531674790822",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:531674790822:web:c183cefe04e07a24b4ad67",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1D80QNSE3V",
}

// Initialize Firebase
let app = null
let auth = null

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  console.log("Firebase initialized successfully for Signature Space")
} catch (error) {
  console.error("Firebase initialization error:", error)
}

// Auth providers
const googleProvider = auth ? new GoogleAuthProvider() : null
const facebookProvider = auth ? new FacebookAuthProvider() : null

// Auth functions with proper error handling
export const signUpWithEmail = async (email, password) => {
  if (!auth) throw new Error("Firebase not initialized")
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithEmail = async (email, password) => {
  if (!auth) throw new Error("Firebase not initialized")
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) throw new Error("Firebase not initialized")
  return await signInWithPopup(auth, googleProvider)
}

export const signInWithFacebook = async () => {
  if (!auth || !facebookProvider) throw new Error("Firebase not initialized")
  return await signInWithPopup(auth, facebookProvider)
}

export const sendEmailLink = async (email, actionCodeSettings) => {
  if (!auth) throw new Error("Firebase not initialized")
  return await sendSignInLinkToEmail(auth, email, actionCodeSettings)
}

export const signUpWithPhone = async (phoneNumber) => {
  if (!auth) throw new Error("Firebase not initialized")

  // Create recaptcha verifier with better error handling
  const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "normal",
    callback: () => {
      console.log("reCAPTCHA solved")
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired")
      throw new Error("Security verification expired. Please try again.")
    },
    "error-callback": (error) => {
      console.error("reCAPTCHA error:", error)
      throw new Error("Security verification failed. Please try again.")
    },
  })

  return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
}

export const verifyPhoneCode = async (verificationId, code) => {
  if (!auth) throw new Error("Firebase not initialized")
  const credential = PhoneAuthProvider.credential(verificationId, code)
  return await signInWithCredential(auth, credential)
}

// Export configuration status
export const isConfigured = () => !!auth
export { auth }
export default app
