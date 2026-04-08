// Configuration Firebase KidRoots
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
