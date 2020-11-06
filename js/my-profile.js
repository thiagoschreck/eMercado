function enableModification(){
    let elem = document.getElementsByClassName("textEditButton");
    for(let i=0; i<elem.length; i++){
        elem[i].classList.remove("border-0");
        elem[i].attributes.removeNamedItem("disabled");
    }
};

//Funció    n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // enableModification();
});