//import { eventNames } from "cluster";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDeIWcAmN-8lvSISlVmHqGscPwuJ-g2aNI",
  authDomain: "zerowaste-2bdc4.firebaseapp.com",
  databaseURL: "https://zerowaste-2bdc4.firebaseio.com",
  projectId: "zerowaste-2bdc4",
  storageBucket: "zerowaste-2bdc4.appspot.com",
  messagingSenderId: "429818693589"
};
firebase.initializeApp(config);




const registerButton = document.querySelector('#register');
const loginButton = document.querySelector('#login');
const postButton = document.querySelector('#sendPost');


//Reistrar Usuarios
const register = () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

    });
}

const login = () => {

  let email2 = document.querySelector("#email2").value;
  let password2 = document.querySelector("#password2").value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
}

const observer = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      showContent();

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario activo')
    }
  });
};

observer();

const showContent = () => {
  let content = document.querySelector('#onlylogged');
  content.innerHTML = "Sólo lo ven personas que tengan cuenta";

};




// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

//Post
const post = () => {

  let postWritten = document.querySelector('#post').value;
  db.collection('post').add({
    post: postWritten,

  })
    .then(function (docRef) {
      document.querySelector('#post').value = '';
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

//Print data on screen
let showPost = document.querySelector('#showPost');
db.collection('post').onSnapshot((querySnapshot) => {
  showPost.innerHTML = '';
  querySnapshot.forEach((doc) => {
  
    console.log(`${doc.id} => ${doc.data()}`);
    showPost.innerHTML += `
       <div id="WrittenPost">${doc.data().post}</div>
       <button class="deletePost">Eliminar</button>
       `;
  });
  eventButton();
});
function eventButton() {
  let deleteButton = document.querySelectorAll('.deletePost');
  console.log(deleteButton);
  deleteButton.forEach((button) => {
    button.addEventListener('click', deleteWrittenPost);

  });
}


//Delete posts
function deleteWrittenPost() {
  //let idPost = db.collection("post").doc("post");
  //idPost.get().then(function(doc) {
   // if (doc.exists) {
    console.log(post.doc(post));
     //   console.log("Document data:", doc.data());
   // } else {
        // doc.data() will be undefined in this case
     //   console.log("No such document!");
   // }
}//).catch(function(error) {
 //console.log("Error getting document:", error);
  
  
 
 /*db.collection("post").doc().delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
    deleted id ${doc.id.target.dataset.deleteButton}
  });*/
  //}
  //);
//}








//Buttons
registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
postButton.addEventListener('click', post);
//deleteButton.addEventListener('click',deletePost);
//<button deleteButton id="`${doc.id}`">Eliminar</button>
//removeBtn.addEventListener('click', e => {
//console.log(`deleted row ${e.target.dataset.removeButtonId}`)