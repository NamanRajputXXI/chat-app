import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorge } from "firebase/storage";
import { getFirestrore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBiWSpvv9VoVsTiluNiiO0ceXR9PCVFZ7o",
  authDomain: "chat-app-f4e22.firebaseapp.com",
  projectId: "chat-app-f4e22",
  storageBucket: "chat-app-f4e22.appspot.com",
  messagingSenderId: "885228967069",
  appId: "1:885228967069:web:310e484048d41ffb79f074",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorge(app);
export const db = getFirestrore(app);
