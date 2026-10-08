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
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  verifyBeforeUpdateEmail,
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

// Espace « Mon compte » : changer le mot de passe ou l'e-mail (Firebase demande le mot de passe actuel)
export const hasPassword = (u) => !!u?.providerData?.some((p) => p.providerId === 'password')
export const isGoogleAccount = (u) => !!u?.providerData?.some((p) => p.providerId === 'google.com')
async function reauth(u, currentPassword) {
  await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, currentPassword))
}
export async function changePassword(u, currentPassword, newPassword) {
  await reauth(u, currentPassword)
  await updatePassword(u, newPassword)
}
// L'e-mail ne change qu'après un clic sur le lien envoyé à la nouvelle adresse
export async function changeEmail(u, currentPassword, newEmail) {
  await reauth(u, currentPassword)
  await verifyBeforeUpdateEmail(u, newEmail, { url: window.location.origin })
}
