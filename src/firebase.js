import { initializeApp } from 'firebase/app'
import { getFirestore, doc } from 'firebase/firestore'

// הגדרות החיבור ל-Firebase. מפתחות אלה מיועדים להיות פומביים בצד-לקוח —
// האבטחה נשמרת דרך כללי האבטחה (Rules) של Firestore.
const firebaseConfig = {
  apiKey: 'AIzaSyC3kK9mxznk1Xw6AcxWjzibv096taY6JCg',
  authDomain: 'ori-rotemit-apartment.firebaseapp.com',
  projectId: 'ori-rotemit-apartment',
  storageBucket: 'ori-rotemit-apartment.firebasestorage.app',
  messagingSenderId: '297378152414',
  appId: '1:297378152414:web:9c936e543e3f433e0ca74f',
  measurementId: 'G-NR0PMHFSHH',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// מסמך משותף יחיד שאורי ורותם חולקים — שניהם קוראים וכותבים אליו.
export const sharedDoc = doc(db, 'shared', 'state')
