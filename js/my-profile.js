
function toggleButton() {
    var btn = document.getElementById("toggleEditButton");
    if (!isModifiable) {
        btn.style = "background-color: green;"
        btn.innerHTML =
            `
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            Guardar cambios
            `
    } else {
        btn.style = "background-color: #6c757d;"
        btn.innerHTML =
            `
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        Modificar datos
        `
    }
}

var isModifiable = false;

function enableModification() {
    var elem = document.getElementsByClassName("toggleEdit");
    if (isModifiable) {
            for (let i = 0; i < elem.length; i++) {
                elem[i].classList.add("border-0");
                elem[i].toggleAttribute("disabled");
            }
            document.getElementById("imageButton").style = "visibility: hidden";
            toggleButton();
            saveProfileData();
            isModifiable = false;
            location.reload();
        }
    else{
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove("border-0");
            elem[i].toggleAttribute("disabled");
        }
        document.getElementById("imageButton").style = "visibility: unset";
        toggleButton();
        isModifiable = true;
    }
};

function getProfileData() {
    var loginObj = JSON.parse(localStorage.getItem("userInfo"));
    if(loginObj != null){
        document.getElementById("userImage").src = loginObj.image ;
        document.getElementById("userFullName").value = loginObj.name;
        if (loginObj.age != ""){
            document.getElementById("userAge").value = loginObj.age + " años";
        }
        document.getElementById("userEmail").value = loginObj.email;
        document.getElementById("userPhone").value = loginObj.phone;
    }
}

function saveProfileData() {
    var userImg = document.getElementById("userImage").src;
    var userName = document.getElementById("userFullName").value;
    var userAge = document.getElementById("userAge").value.replace(/[^0-9\.]+/g, '');
    var userEmail = document.getElementById("userEmail").value;
    var userPhone = document.getElementById("userPhone").value;

    var loginObj = {
        image: userImg,
        name: userName,
        age: userAge,
        email: userEmail,
        phone: userPhone
    };
    localStorage.setItem("userInfo", JSON.stringify(loginObj));
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getProfileData();
    document.getElementById("toggleEditButton").addEventListener("click", function(event){
        event.preventDefault();
        enableModification();
    });

    document.getElementById("imageButton").addEventListener("change", function() {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.addEventListener("load", () => {
            document.getElementById("userImage").setAttribute("src", reader.result);
        });
    })
});