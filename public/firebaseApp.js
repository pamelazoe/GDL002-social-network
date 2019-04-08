initFirebase();

function initFirebase(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA5c3QxVhf1fbrXpiFFlQs2ZSgae2EPeIM",
      authDomain: "zero-waste-d5038.firebaseapp.com",
      databaseURL: "https://zero-waste-d5038.firebaseio.com",
      projectId: "zero-waste-d5038",
      storageBucket: "",
      messagingSenderId: "222059406012"
  };
  firebase.initializeApp(config);
  
  
}
