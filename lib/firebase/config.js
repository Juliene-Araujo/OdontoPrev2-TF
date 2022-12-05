import {
  initializeApp,
  getFirestore,
  getAuth,
  GoogleAuthProvider,
} from "./exports.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2xvKqr0pAWau2D1JPv6G9JiGskUvLUsA",
  authDomain: "odontoprev2-a71a8.firebaseapp.com",
  projectId: "odontoprev2-a71a8",
  storageBucket: "odontoprev2-a71a8.appspot.com",
  messagingSenderId: "116183835186",
  appId: "1:116183835186:web:347fa99d2e0efaf503122b",
  measurementId: "G-VR95SGRLQ1",
};

const app = initializeApp(firebaseConfig);
export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(app);