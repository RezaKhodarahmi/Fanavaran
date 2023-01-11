
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFicNow7obj7zlfXttyE_C2gZ4w7N2gGQ",
  authDomain: "fanavaran-b675a.firebaseapp.com",
  projectId: "fanavaran-b675a",
  storageBucket: "fanavaran-b675a.appspot.com",
  messagingSenderId: "191774714622",
  appId: "1:191774714622:web:62cc9aa504ac573fa2d3af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);