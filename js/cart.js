var cartArray = [];
var currency = [];
var price = [];
var quantity = [];

var precioCarrito = 0;
var impuestoCarrito = 0;
var totalCarrito = 0;
var taxType = 0;
var currentPaymentForm = 0;

function loadCartList(array) { // Cargo la tabla

    let htmlContentToAppend = "";
    for (let i = 0; i < array.articles.length; i++) {
        let product = array.articles[i];
        htmlContentToAppend +=
            `
            <tr class="articleRow">
                <td style="width:15%"><img width="80%" src="` + product.src + `" alt="placeholder"></td>
                <td class="align-middle">` + product.name + `</td>
                <td class="articleCost align-middle">` + product.currency + " " + product.unitCost + `</td>
                <td class="align-middle"><input class="articleQuantity form-control" type="number" min="0" value="` + product.count + `" style="min-width: 4em; width: 4em"></td>
                <td class="articleTotal align-middle">` + product.currency + " " + (product.unitCost * product.count) + `</td>
                <td class="btn-hideItem align-middle">
                    <button type="button"" class="button btn-danger">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </td>
            </tr>
            `
        document.getElementById(
            "cuerpo-carrito"
        ).innerHTML = htmlContentToAppend;

        // Actualizo los elementos ya existentes
        quantity[i] = product.count;
        currency[i] = product.currency;
        if (currency[i] == "USD") {
            price[i] = product.unitCost;
            precioCarrito += price[i] * quantity[i] * 40;
        } else {
            price[i] = product.unitCost;
            precioCarrito += price[i] * quantity[i];
        }

        document.getElementById("productCostText").innerHTML = "UYU " + precioCarrito;
        updateTax(0.15)
        updateTotalCost();
    }

    let articleRow = document.getElementsByClassName("articleRow");
    let articleTotal = document.getElementsByClassName("articleTotal");
    for (let i = 0; i < articleRow.length; i++) {
        articleRow[i].addEventListener("change", function () {
            quantity[i] = document.getElementsByClassName("articleQuantity")[i].value;
            articleTotal[i].innerHTML = currency[i] + " " + (price[i] * quantity[i]);

            precioCarrito = 0;
            for (let j = 0; j < articleRow.length; j++) {
                if (currency[j] == "USD") {
                    precioCarrito += Math.round(price[j] * quantity[j] * 40);
                } else {
                    precioCarrito += Math.round(price[j] * quantity[j]);
                }
            }
            if (quantity[i] < 1) {
                hideItem(articleRow[i]);
            }

            document.getElementById("productCostText").innerHTML = "UYU " + precioCarrito;
            switch (taxType) {
                case 0:
                    updateTax(0.15);
                    break;
                case 1:
                    updateTax(0.07);
                    break;
                case 2:
                    updateTax(0.05);
                    break;
            }
            updateTotalCost();
        });
        document.getElementsByClassName("btn-hideItem")[i].addEventListener("click", function () {
            quantity[i] = document.getElementsByClassName("articleQuantity")[i].value;
            quantity[i] = 0;
            articleTotal[i].innerHTML = currency[i] + " " + (price[i] * quantity[i]);

            precioCarrito = 0;
            for (let j = 0; j < articleRow.length; j++) {
                if (currency[j] == "USD") {
                    precioCarrito += Math.round(price[j] * quantity[j] * 40);
                } else {
                    precioCarrito += Math.round(price[j] * quantity[j]);
                }
            }

            document.getElementById("productCostText").innerHTML = "UYU " + precioCarrito;
            switch (taxType) {
                case 0:
                    updateTax(0.15);
                    break;
                case 1:
                    updateTax(0.07);
                    break;
                case 2:
                    updateTax(0.05);
                    break;
            }
            hideItem(articleRow[i]);
            updateTotalCost();
        });
    }

}

function hideItem(item) {
    item.style.display = 'none';
}

function updateTax(percentage) {
    impuestoCarrito = Math.round(precioCarrito * percentage);
    document.getElementById("comissionText").innerHTML = "UYU " + impuestoCarrito;
}

function updateTotalCost() {
    totalCarrito = precioCarrito + impuestoCarrito;
    document.getElementById("totalCostText").innerHTML = "UYU " + totalCarrito;
}

function getCardType() {
    let num = document.getElementById("ccNumber").value;
    let brandBadge = document.getElementById("brandBadge");

    let numArr = num.split('');
    if (numArr[0] == 3 && (numArr[1] == 4 || numArr[1] == 7)) {
        // alert('American Express');
        brandBadge.innerHTML = "American Express";
    } else if (numArr[0] == 4) {
        // alert('Visa');
        brandBadge.innerHTML = "Visa";
    } else if (numArr[0] == 3 && numArr[1] == 0 && ((1 <= numArr[2]) && (numArr[2] <= 5) || (numArr[2] == 9))) {
        // alert('Diners Club');
        brandBadge.innerHTML = "Diners Club";
    } else if (((numArr[0] == 5) && ((numArr[1] >= 1) && (numArr[1] <= 5))) || ((numArr[0] == 2) && ((numArr[1] >= 2) && (numArr[1] <= 7)))) {
        // alert('MasterCard');
        brandBadge.innerHTML = "Master Card";
    } else if ((num.split('', 2) == '3,5') || (num.split('', 4) == '2,1,3,1') || (num.split('', 4) == '1,8,0,0')) {
        // alert('JCB');
        brandBadge.innerHTML = "JCB";
    } else if ((num.split('', 4) == '6,0,1,1') || (num.split('', 2) == '6,5') || ((num.split('', 2) == '6,4') && (numArr[2] >= 4) && (numArr[2] <= 9))) {
        // alert('Discover');
        brandBadge.innerHTML = "Discover";
    } else {
        brandBadge.innerHTML = "";
    }
}

function expSlash() {
    let code = document.getElementById("ccExp");
    if (code.value.length == 2) {
        let hasSlash = false;
        for (let i = 0; i < code.value.length; i++) {
            if (code.value[i] == "/") {
                hasSlash = true;
                break;
            }
        }
        if (!hasSlash) {
            code.value += "/";
        }
    } else if (code.value.length == 4) {
        let hasSlash = false;
        for (let i = 0; i < code.value.length; i++) {
            if (code.value[i] == "/") {
                hasSlash = true;
                break;
            }
        }
        if (!hasSlash) {
            code.value = code.value[0] + code.value[1] + "/" + code.value[2] + code.value[3];
        }
    } else if (code.value.length >= 5) {
        let hasSlash = false;
        for (let i = 0; i < code.value.length; i++) {
            if (code.value[i] == "/") {
                hasSlash = true;
                break;
            }
        }
        if (!hasSlash) {
            code.value = code.value[0] + code.value[1] + "/" + code.value[2] + code.value[3];
        }
    }
}

function validateCard() {
    //funcion tomada de https://gist.github.com/DiegoSalazar/4075533 (usa el Algoritmo de Luhn)
    let value = document.getElementById("ccNumber").value;
    let verificationBadge = document.getElementById("verificationBadge");

    if (value.length > 13) {
        if (/[^0-9-\s]+/.test(value)) return false;

        let nCheck = 0,
            bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

            nCheck += nDigit;
            bEven = !bEven;
        }
        if (value.length > 13) {
            if (!(nCheck % 10) == 0) {
                verificationBadge.innerHTML = "Número inválido";
                return false;
            } else {
                verificationBadge.innerHTML = "";
            }
        }
    } else if (value.length == 0) {
        verificationBadge.innerHTML = "";
        return false;
    }
}

function validarCampos() {
    let nombre = document.getElementById("ccName").value;
    var letras = /^[a-zA-Z][a-zA-Z\s]*$/;
    if (!(nombre.match(letras))) {
        alert("Por favor, ingrese un nombre válido.");
    } else if ((document.getElementById("verificationBadge").innerHTML != "") || (document.getElementById("brandBadge").innerHTML == "")) {
        alert("Por favor, verifique el número de la tarjeta.");
    } else {
        alert("Compra exitosa!");
        window.location.assign("index.html");
    }
}

document.getElementById("ccNumber").addEventListener("keyup", function () {
    getCardType();
    validateCard();
});

document.getElementById("ccExp").addEventListener("keyup", function () {
    expSlash();
})

document.getElementById("premiumradio").addEventListener("change", function () {
    updateTax(0.15);
    updateTotalCost();
    taxType = 0;
});
document.getElementById("expressradio").addEventListener("change", function () {
    updateTax(0.07);
    updateTotalCost();
    taxType = 1;
});
document.getElementById("standardradio").addEventListener("change", function () {
    updateTax(0.05);
    updateTotalCost();
    taxType = 2;
});

document.getElementById("btnComprar").addEventListener("click", function () {
    validarCampos();
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            loadCartList(resultObj.data);
        }
    });
});