// firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// ✅ Firebase configuration for AES Media Uploader
const firebaseConfig = {
  apiKey: "AIzaSyAMwFYcCp1o3t1bN64iNw8A6iAV4_up6kA",
  authDomain: "aes-media-uploader.firebaseapp.com",
  projectId: "aes-media-uploader",
  storageBucket: "aes-media-uploader.appspot.com",
  messagingSenderId: "762539191842",
  appId: "1:762539191842:web:410bb55eb5b502897b4a47"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase Storage
const storage = getStorage(app);
export { storage };
