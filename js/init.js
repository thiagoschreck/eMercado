const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
// const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json"; //1 item
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //2 items
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        }
    );
}

function logoff() {
    sessionStorage.removeItem("loginData");
    localStorage.removeItem("loginData");
}

function getFileName() {
    var url = window.location.pathname;
    var lastUri = url.substring(url.lastIndexOf('/') + 1);
    if (lastUri.indexOf('?') != -1)
        return lastUri.substring(0, lastUri.indexOf('?'));
    else
        return lastUri;
}

if (localStorage.getItem('loginData') != null) {
    sessionStorage.setItem('loginData', localStorage.getItem('loginData'));
}
if (sessionStorage.getItem('loginData') === null && getFileName() != "login.html") {
    location.replace('login.html');
}
if (sessionStorage.getItem('loginData') != null && getFileName() == "login.html") {
    location.replace('index.html');
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    if (getFileName() != "login.html") {
        loginData = JSON.parse(sessionStorage.getItem("loginData"));
        document.getElementById("dropdown_perfil").innerHTML = JSON.parse(sessionStorage.getItem("loginData")).username;
    }
});