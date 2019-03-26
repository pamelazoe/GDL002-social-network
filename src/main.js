function signUp  (e) {
    e.preventDefault(e);
    let emailSignUp = document.getElementById("txtEmailSignUp").value;
    let passwordSignUp = document.getElementById("txtPasswordSignUp").value;
        
    firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        
      });
}
document.getElementById("btnSignUp").addEventListener("click", signUp);

function logIn (e) {
    e.preventDefault(e);
    let emailLogIn = document.getElementById("txtEmailLogIn").value;
    let passwordLogIn = document.getElementById("txtPasswordLogIn").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
document.getElementById("btnLogIn").addEventListener("click", logIn);


/* (function() {

// Initialize Firebase
const config = {
    apiKey: "AIzaSyA5c3QxVhf1fbrXpiFFlQs2ZSgae2EPeIM",
    authDomain: "zero-waste-d5038.firebaseapp.com",
    databaseURL: "https://zero-waste-d5038.firebaseio.com",
    projectId: "zero-waste-d5038",
    storageBucket: "",
    messagingSenderId: "222059406012"
  };
  firebase.initializeApp(config);

//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogIn = document.getElementById('btnLogIn');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogOut = document.getElementById('btnLogOut');

// Log in event
btnLogIn.addEventListener('click', e => {
// Email and pass

const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();
// Sign in
auth.signInWithEmailAndPassword(email, pass);
promise.catch(e => console.log(e.message));

});

//Sign up event
btnSignUp.addEventListener('click', e =>{
    //GET EMAIL AND PASS
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

});

btnLogOut.addEventListener('click', e =>{
firebase.auth().signOut();
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogOut.classList.remove('hide');
    } else {
        console.log('not logged in');
        btnLogOut.classList.add('hide');
    }
});

});
*/