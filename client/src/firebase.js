
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-619fb.firebaseapp.com",
  projectId: "mernestate-619fb",
  storageBucket: "mernestate-619fb.appspot.com",
  messagingSenderId: "98055686431",
  appId: "1:98055686431:web:59da8ce731490397bc882a",
  measurementId: "G-BKDHS27LD3"
};

export  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);