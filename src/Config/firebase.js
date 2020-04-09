import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBg1O7uJJL9FJuFQb7K8gQSNSLf0nKter0",
    authDomain: "my-first-project-273503.firebaseapp.com",
    databaseURL: "https://my-first-project-273503.firebaseio.com",
    projectId: "my-first-project-273503",
    storageBucket: "my-first-project-273503.appspot.com",
    messagingSenderId: "132859392200",
    appId: "1:132859392200:web:7d04e96b7cd44f4314b5fd",
    measurementId: "G-6WRWG04TH3",
    storageBucket: 'gs://my-first-project-273503.appspot.com',
};


// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

const db = app.database()
const auth = app.auth()
const storage = app.storage()

export { db, auth, storage }