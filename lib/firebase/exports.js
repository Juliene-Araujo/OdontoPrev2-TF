export { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"; 

export {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"; // eslint-disable-line