
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

console.log(process.env.REACT_APP_apiKey)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
  // apiKey: "AIzaSyAjRLyiV9YR8d_88HT0Amufg_UwdIeOIjI",
  // authDomain: "kanban-2fee4.firebaseapp.com",
  // projectId: "kanban-2fee4",
  // storageBucket: "kanban-2fee4.appspot.com",
  // messagingSenderId: "822956477330",
  // appId: "1:822956477330:web:88e7ff4f4382d2b82c8f4b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

auth.languageCode = 'vn';