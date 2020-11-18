"use strict";

var form = document.getElementById("form");
var chk_remember = document.getElementById("chk_remember");
var email = document.getElementById("email");
var pwd = document.getElementById("pwd");
var btn_ingresar = document.getElementById("btn_ingresar");
var btn_registro = document.getElementById("btn_registro");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var usuario = email.value;
  var password = pwd.value;

  if (chk_remember.checked == true) {
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('password', password);
    location.href = './index.html';
  } else {
    sessionStorage.setItem('usuario', usuario);
    sessionStorage.setItem('password', password);
    location.href = './index.html';
  }
});
chk_remember.addEventListener("mouseover", function (event) {
  btn_ingresar.innerHTML = "¿Guardar credenciales?";
});
chk_remember.addEventListener("mouseleave", function (event) {
  btn_ingresar.innerHTML = "Ingresar";
});
btn_ingresar.addEventListener("mousedown", function (event) {
  btn_ingresar.setAttribute("style", "background-color: green");
});
btn_ingresar.addEventListener("mouseup", function (event) {
  btn_ingresar.setAttribute("style", "background-color: rgb(214, 28, 108)");
});
btn_ingresar.addEventListener("mouseleave", function (event) {
  btn_ingresar.setAttribute("style", "background-color: rgb(214, 28, 108)");
});
btn_registro.addEventListener("mouseover", function (event) {
  btn_registro.innerHTML = "Actualmente en desarrollo";
});
btn_registro.addEventListener("mouseleave", function (event) {
  btn_registro.innerHTML = "Registrarme";
}); //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {});