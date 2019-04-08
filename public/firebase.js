var firestore = firebase.firestore();
//SIGN UP FUNCTION
    const socialNetwork = {
        logIn: logIn,
        signUp: signUp,
        goSignUp: goSignUp,
        goSignIn: goSignIn,
        post: post,
        logOut: logOut,
    };
    let onNavItemClick = (pathName) => {
        window.history.pushState({}, pathName, window.location.origin + pathName);
        //fetchContent (asíncrona) toma el texto guardado en los html
        fetchContent(routes[window.location.pathname])
        //después el texto se deposita en el div vacío
        .then(html => contentDiv.innerHTML = html)
        //al final se carga la función que contiene los eventos de botón guardados en la función addEventlisteners()
        .then(() => addEventListeners());
      }
      function goSignUp() {
        onNavItemClick("/sign-up");
        console.log("Sign-up user :)");
        
      } 
      function goSignIn() {
        onNavItemClick("/sign-in");
        console.log("Sign-in user :)");
        
      } 
    


//LOG IN FUNCTION
function logIn  (email, password){
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() =>
    onNavItemClick('/community')
  )
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  alert("¯\_(ツ)_/¯ failed login firebase "+ errorCode + " " + errorMessage);
  // ...
  });
}
function signUp (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function failure(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Nothing to see here ¯\_(ツ)_/¯" + errorCode + errorMessage);
      });
      //After the user is created I check that the user is signed in
      firebase.auth().onAuthStateChanged(function(user) {
        //If my new user is logged in (which is true, because after registration it logs in automatically)
        if (user) {
          //I save the uid in a variable
          let uid = user.uid;
          //I call my save data function and send the uid
          saveData(uid, email, password);
          onNavItemClick('/community');
          printPosts();
        }
      });
    }
//LOG OUT FUNCTION
function logOut() {
    firebase.auth().signOut()
    .then(function() {
        // Sign-out successful.
        onNavItemClick('/');
    }).catch(function(error) {
        // An error happened.
    });
}
const postButton = document.querySelector('#sendPost');

let db = firebase.firestore();

//Post
function post () {

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

function printData() {
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
}
function eventButton() {
  let deleteButton = document.querySelectorAll('.deletePost');
  console.log(deleteButton);
  deleteButton.forEach((button) => {
    button.addEventListener('click', deleteWrittenPost);

  });
}


// function saveData(uid, email, password){
//   let user = {
//     savedusername: document.getElementById('txtUserName').value,
//     email: email,
//     password: password,
//   }
//   //Dentro de mi rama de usuarios, guardo el usuario con su uid
//   firebase.database().ref("users/" + uid).set(user);
// }

//     function publish() {
//       const uid = firebase.auth().currentUser.uid;
//       const textpost = document.getElementById("comm-post").value;
    
//       writeNewPost(uid, textpost);
//     }
// //Function to create new post
// function writeNewPost(uid, textpost) {
//   // A post entry.
//   firebase.database().ref('/users/' + uid).once('value')
//   .then(function(snapshot) {
//     //Saving the name of the username, so we can save it in general posts as well
//     let username = (snapshot.val().userdata);
//     //Setting the data object
//     let postData = {
//       userdata: username,
//       userPost: textpost,
//     };
// // Get a key for a new Post.
// var newPostKey = firebase.database().ref().child('posts').push().key;

// // Write the new post's data simultaneously in the posts list and the user's post list.
// var updates = {};
// //Pushing the posts to a common place, so we can build our newsfeed
// updates['/posts/' + newPostKey] = postData;
// //Saving the posts directly under the current user
// updates['/users/' + uid + '/posts/' + newPostKey] = postData;

// return firebase.database().ref().update(updates);
// });
// }

// function printPosts(){

//   //Grab current user
//   const user = firebase.auth().currentUser.uid;
//   //Getting general posts list
//   firebase.database().ref('/posts').on('value', function(snapshot) {
//     let array = snapshotToArray(snapshot);
//     array.reverse();

//     print(array);

//     function print(array){
//       document.getElementById("comm-posts").innerHTML = `
//       ${array.map(postTemplate).join("")}`;
//     }

//   });

//   function postTemplate(post){
//     return `
//     <div class="post">
//       <h2 class="createPostTitle">${post.userdata}</h2>
//       <textarea class="comm-post" name="name" rows="6" cols="40" id="comm-post">${post.userPost}</textarea>
//     </div>
//     `;
//   }

//   function snapshotToArray(snapshot) {
//     var returnArr = [];

//     snapshot.forEach(function(childSnapshot) {
//         var item = childSnapshot.val();
//         item.key = childSnapshot.key;

//         returnArr.push(item);
//     });
//     return returnArr;
// };
// }

// const newPost = document.getElementById("#community-post");

//Se crean los nodos de html


// const cafeList = document.querySelector('#cafe-list');

// create element & render cafe
// function renderCafe(doc){
//     let li = document.createElement('li');
//     document.body.appendChild(li);
//     let name = document.createElement('span');
//     let city = document.createElement('span');

//     li.setAttribute('data-id', doc.id);
//     name.textContent = doc.data().name;
//     city.textContent = doc.data().city;

//     li.appendChild(name);
//     li.appendChild(city);

//     cafeList.appendChild(li);
// }

// // getting data
// firestore.collection('cafes').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// window.onload = function renderPost(doc){
//   let li = document.createElement("li");
//   let name = document.createElement("span");
//   let city = document.createElement("span");
//   // let divButtons = document.createElement ("div");
//   // divButtons.className = "buttons-post";
//   // let del = document.createElement("button");
//   // del.className = "del-post";
//   // let edit = document.createElement("button");
//   // edit.className = "edit-post";
//   // let respond = document.createElement("button");
//   // respond.className = "respond-post";

//   li.setAttribute("data-id", doc.id);
//   name.textContent = doc.data.name;
//   city.textContent = doc.data.city;
  
//   li.appendChild(name);
//   li.appendChild(city);
//   newPost.appendChild("li");

//   // divPost.innerHTML+= divText.outerHTML + divButtons.outerHTML.appendChild(divPost);
//   // divText.appendChild(divPost);
//   // divButtons.innerHTML+= del.outerHTML + edit.outerHTML + edit.outerHTML.appendChild(divButtons);
//   // divButtons.appendChild(divPost);

  
// }

// db.collection('community').get().then((snapshot)=>{
//   snapshot.docs.forEach(doc => {
//     renderPost(doc);
//   })
// })