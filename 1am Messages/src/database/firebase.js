import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw_h8BK5LKQ8egkkjjmiz9TpWguemylN0",
  authDomain: "am-notes-a850b.firebaseapp.com",
  projectId: "am-notes-a850b",
  storageBucket: "am-notes-a850b.appspot.com",
  messagingSenderId: "1063739612308",
  appId: "1:1063739612308:web:a814dd0575fbd2b6e7a881",
  measurementId: "G-Q54QWTMNQB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;