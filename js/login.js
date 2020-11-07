const form = document.getElementById("form");
const chk_remember = document.getElementById("chk_remember")
const email = document.getElementById("email");
const pwd = document.getElementById("pwd");
const btn_ingresar = document.getElementById("btn_ingresar");
const btn_registro = document.getElementById("btn_registro");

form.addEventListener("submit", function (event) {
    event.preventDefault()
    var loginData = {username: email.value, password: pwd.value};

    if (chk_remember.checked) {
        localStorage.setItem("loginData", JSON.stringify(loginData));
    } else {
        sessionStorage.setItem("loginData", JSON.stringify(loginData));
    }
    location.href = './index.html';
});

chk_remember.addEventListener("mouseover", function (event) {
    btn_ingresar.innerHTML = "¿Guardar credenciales?";
});

chk_remember.addEventListener("mouseleave", function (event) {
    btn_ingresar.innerHTML = "Ingresar";
});

btn_ingresar.addEventListener("mouseleave", function (event) {
    btn_ingresar.setAttribute("style", "background-color: rgb(214, 28, 108)")
});

btn_registro.addEventListener("mouseover", function (event) {
    btn_registro.innerHTML = "Actualmente en desarrollo";
});

btn_registro.addEventListener("mouseleave", function (event) {
    btn_registro.innerHTML = "Registrarme";
});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});