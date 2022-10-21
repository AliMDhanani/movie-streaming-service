import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEip9DWfsr0ZcpT2T1v9HWVM2HBp6HzHQ",
  authDomain: "movie-streaming-service-a56fe.firebaseapp.com",
  projectId: "movie-streaming-service-a56fe",
  storageBucket: "movie-streaming-service-a56fe.appspot.com",
  messagingSenderId: "894021840648",
  appId: "1:894021840648:web:34f571f11c623d0b4206bd",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
