
// Initialize Cloud Firestore through Firebase
// var db = firebase.firestore();
// const socialNetwork = {
//     logIn: logIn,
//     signUp: signUp,
//     welcome: welcome,
//     sign: sign,
// };
// Variable que declara el div vacío donde se va a depositar el contenido de html de cada template

let contentDiv = document.getElementById('content');

// Rutas de navegación para cada página
let routes = {
    
    '/': `./templates/welcome.html`,
    '/welcome':`./templates/welcome.html`,
    '/sign-in': `./templates/sign-in.html`,
    '/sign-up': `./templates/sign-up.html`,
    '/community': `./templates/community.html`,
    '/quickguide': `./templates/quickguide.html`,
  };

window.onpopstate = () => {
    fetchContent(routes[window.location.pathname])
    .then(html => contentDiv.innerHTML = html);
  }

//   Función para el cambio de páginas y contenido de estados de navegación
// let onNavItemClick = (pathName) => {
//     window.history.pushState({}, pathName, window.location.origin + pathName);
//     //fetchContent (asíncrona) toma el texto guardado en los html
//     fetchContent(routes[window.location.pathname])
//     //después el texto se deposita en el div vacío
//     .then(html => contentDiv.innerHTML = html)
//     //al final se carga la función que contiene los eventos de botón guardados en la función addEventlisteners()
//     .then(() => addEventListeners());
//   }
 
//   Fetch para convertir la información contenida en los html a texto (.text en lugar de JSON)
const fetchContent = url => fetch(url)
.then(function(response){
  //Convierte a texto y no a .json
  return response.text()  
})
.then(function(html){
  //Devuelve el html
    return html;
})
.catch(function(err){
    console.log("Fetch failed ¯\_(ツ)_/¯", err);
});

fetchContent(routes[window.location.pathname])
.then(html => contentDiv.innerHTML = html)
.then(() => addEventListeners());


function addEventListeners(){
    const btnList = document.querySelectorAll(".jsBtn");
  
    for (let i = 0; i < btnList.length; i++) {
      //Button action for login/register page
      if (window.location.pathname == "/sign-in" || window.location.pathname == "/sign-up") {
        
        btnList[i].addEventListener("click", function (event) {
            event.preventDefault();
            socialNetwork[event.target.dataset.next](document.getElementById(event.target.attributes.dataFirst.value).value,
            document.getElementById(event.target.attributes.dataSecond.value).value)
              
        });
      }
      else if (window.location.pathname == "/sign-in" || window.location.pathname == "/sign-up") {
        
        btnList[i].addEventListener("click", function (event) {
          event.preventDefault();
          socialNetwork[event.target.dataset.redirect]();
        });
      }
      else {
  
        btnList[i].addEventListener("click", function (event) {
          event.preventDefault();
          socialNetwork[event.target.dataset.next]();
        });
      }
    }
  }
