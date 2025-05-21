// firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMwFYcCp1o3t1bN64iNw8A6iAV4_up6kA",
  authDomain: "aes-media-uploader.firebaseapp.com",
  projectId: "aes-media-uploader",
  storageBucket: "aes-media-uploader.firebasestorage.app",  // <-- FIXED HERE
  messagingSenderId: "762539191842",
  appId: "1:762539191842:web:410bb55eb5b502897b4a47"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
