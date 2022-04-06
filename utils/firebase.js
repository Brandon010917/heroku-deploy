const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDFMQNXee8rLJ-uKPck4Eanplqiq-givgQ",
  authDomain: "multer-project-db663.firebaseapp.com",
  projectId: "multer-project-db663",
  storageBucket: "multer-project-db663.appspot.com",
  messagingSenderId: "657406790769",
  appId: "1:657406790769:web:50bc9baf81f1a7a150dfd0",
  measurementId: "G-24S84L23C5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };
