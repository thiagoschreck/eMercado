"use strict";

var CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
var PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
var CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
var PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
var PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
var PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
var CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
var CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function showSpinner() {
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function hideSpinner() {
  document.getElementById("spinner-wrapper").style.display = "none";
};

var getJSONData = function getJSONData(url) {
  var result = {};
  showSpinner();
  return fetch(url).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }).then(function (response) {
    result.status = 'ok';
    result.data = response;
    hideSpinner();
    return result;
  })["catch"](function (error) {
    result.status = 'error';
    result.data = error;
    hideSpinner();
    return result;
  });
};

function getFileName() {
  var url = window.location.pathname;
  var lastUri = url.substring(url.lastIndexOf('/') + 1);
  if (lastUri.indexOf('?') != -1) return lastUri.substring(0, lastUri.indexOf('?'));else return lastUri;
}

if (localStorage.getItem('usuario') != null) {
  sessionStorage.setItem('usuario', localStorage.getItem('usuario'));
  sessionStorage.setItem('password', localStorage.getItem('password'));
}

if (sessionStorage.getItem('usuario') === null && getFileName() != "login.html") {
  location.replace('login.html');
}

if (sessionStorage.getItem('usuario') != null && getFileName() == "login.html") {
  location.replace('index.html');
} // var gAuth = "oauth2_cs::https://thiagoschreck.github.io::932735781756-4qes7pllcdmls039srbpjtt68sru33gp.apps.googleusercontent.com";
// if (localStorage.getItem(gAuth) != null){
//   sessionStorage.setItem(gAuth, localStorage.getItem(gAuth));
// }
// if (sessionStorage.getItem(gAuth) === null && getFileName() != "login.html") {
//   location.replace('login.html');
// }
// if (sessionStorage.getItem(gAuth) != null && getFileName() == "login.html") {
//   location.replace('index.html');
// }
//oauth2_cs::https://thiagoschreck.github.io::932735781756-4qes7pllcdmls039srbpjtt68sru33gp.apps.googleusercontent.com
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
  if (getFileName() != "login.html") {
    document.getElementById("dropdown_perfil").innerHTML = sessionStorage.getItem("usuario");
  }
});