// Authentification Firebase : Provider + hook + helpers
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

const AuthCtx = createContext({ user: null, loading: true })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  return <AuthCtx.Provider value={{ user, loading }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)

export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const googleSignIn = () => signInWithPopup(auth, googleProvider)
export const signOut = () => fbSignOut(auth)
export const resetPassword = (email) => sendPasswordResetEmail(auth, email)
export const verifyEmail = (u) => sendEmailVerification(u)
