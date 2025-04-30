// services/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración original
const firebaseConfig = {
  apiKey: "AIzaSyB8T4jBikwp01J04EYB-Dd_fbk_XZS_PUA",
  authDomain: "matchproduct-59c46.firebaseapp.com",
  projectId: "matchproduct-59c46",
  storageBucket: "matchproduct-59c46.appspot.com", // corregido: era .app → .app*spot*.com
  messagingSenderId: "480018371284",
  appId: "1:480018371284:web:14b6c4514ec63136dea141",
  measurementId: "G-7XW7LKR5N6"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Exporta servicios que usará tu app
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };