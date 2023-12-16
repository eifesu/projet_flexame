// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGsASM2uHi3Zptf8WInd4OCu43GPJV1uc",
    authDomain: "lambda-a0ecf.firebaseapp.com",
    projectId: "lambda-a0ecf",
    storageBucket: "lambda-a0ecf.appspot.com",
    messagingSenderId: "356048889410",
    appId: "1:356048889410:web:e2cb18bd77484d0d16afdb",
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;
