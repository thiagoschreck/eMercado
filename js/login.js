const form = document.getElementById("form");
const chk_remember = document.getElementById("chk_remember")
const email = document.getElementById("email");
const pwd = document.getElementById("pwd");

form.addEventListener("submit", function (event) {
	event.preventDefault()
	let usuario = Array({
		correo: email.value,
		pass: pwd.value
    });
    if(chk_remember.checked == true){
        localStorage.setItem('usuario', JSON.stringify(usuario));
        location.href='./index.html';
    }
    else{
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        location.href='./index.html';
    }
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
