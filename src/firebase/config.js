import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDV37NwfQPWv2vkHt8_VD0XoJpp2HMmpDQ",
  authDomain: "mi-primer-proyecto-prog3.firebaseapp.com",
  projectId: "mi-primer-proyecto-prog3",
  storageBucket: "mi-primer-proyecto-prog3.firebasestorage.app",
  messagingSenderId: "868288326893",
  appId: "1:868288326893:web:e65e20fcb2a466695570e4"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
