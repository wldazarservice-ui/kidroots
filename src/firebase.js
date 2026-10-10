// Configuration Firebase Mokalibo
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD2rOoIjILi0CsM3qVpghqwEKVcwoYSs9w',
  authDomain: 'kidroots-cdaf0.firebaseapp.com',
  projectId: 'kidroots-cdaf0',
  storageBucket: 'kidroots-cdaf0.firebasestorage.app',
  messagingSenderId: '769602646598',
  appId: '1:769602646598:web:208b6eb7528af054ef1047',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
// Copie locale de la base (IndexedDB) : l'app fonctionne hors-ligne et synchronise au retour du reseau
let firestore
try {
  firestore = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) })
} catch {
  firestore = getFirestore(app) // navigateur sans IndexedDB (navigation privee…)
}
export const db = firestore
export const googleProvider = new GoogleAuthProvider()
