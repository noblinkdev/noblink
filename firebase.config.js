import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDVvustv2184CoXGtxcKa_ZodRwO5cPHOo",
    authDomain: "noblinkapp.firebaseapp.com",
    projectId: "noblinkapp",
    storageBucket: "noblinkapp.appspot.com",
    messagingSenderId: "634693693254",
    appId: "1:634693693254:web:a7b77a4bde5be71bd1ff47",
    measurementId: "G-GVSXZ21G0E"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;