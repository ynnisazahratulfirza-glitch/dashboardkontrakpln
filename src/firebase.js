import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAXBzwOiVF9hl_Mp5VJtRhKd3KLrpdIorU",
  authDomain: "dashboardkontrak-617c9.firebaseapp.com",
  projectId: "dashboardkontrak-617c9",
  storageBucket: "dashboardkontrak-617c9.firebasestorage.app",
  messagingSenderId: "222659639903",
  appId: "1:222659639903:web:4036f46b18d1a055ec39ea",
  measurementId: "G-KZJD1P2Z16"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
