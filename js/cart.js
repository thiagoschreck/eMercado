var currency = [];
var price = [];
var quantity = [];

var precioCarrito = 0;
var impuestoCarrito = 0;
var totalCarrito = 0;
var currentTax = 0;

function loadCartList(array) { // Cargo la tabla

    let htmlContentToAppend = "";
    for (let i = 0; i < array.articles.length; i++) {
        let product = array.articles[i];
        htmlContentToAppend +=
            `
            <tr class="articleRow">
                <td style="width:15%"><img width="80%" src="` + product.src + `" alt="placeholder"></td>
                <td>` + product.name + `</td>
                <td class="articleCost">` + product.currency + " " + product.unitCost + `</td>
                <td><input class="articleQuantity " type="number" min="1" value="` + product.count + `" style="min-width: 2em; width: 3em"></td>
                <td class="articleTotal">` + product.currency + " " + (product.unitCost * product.count) + `</td>
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
            //Controla que la cantidad no sea menor a 1
            if (quantity[i] < 1) {
                quantity[i] = 1;
                document.getElementsByClassName("articleQuantity")[i].value = quantity[i];
            }
            articleTotal[i].innerHTML = currency[i] + " " + (price[i] * quantity[i]);

            precioCarrito = 0;
            for (j = 0; j < articleRow.length; j++) {
                if (currency[j] == "USD") {
                    precioCarrito += Math.round(price[j] * quantity[j] * 40);
                } else {
                    precioCarrito += Math.round(price[j] * quantity[j]);
                }
            }
            document.getElementById("productCostText").innerHTML = "UYU " + precioCarrito;
            switch (currentTax) {
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
    }
}

function updateTax(percentage) {
    impuestoCarrito = Math.round(precioCarrito * percentage);
    document.getElementById("comissionText").innerHTML = "UYU " + impuestoCarrito;
}

function updateTotalCost() {
    totalCarrito = precioCarrito + impuestoCarrito;
    document.getElementById("totalCostText").innerHTML = "UYU " + totalCarrito;
}

document.getElementById("premiumradio").addEventListener("change", function () {
    updateTax(0.15);
    updateTotalCost();
    currentTax = 0;
});
document.getElementById("expressradio").addEventListener("change", function () {
    updateTax(0.07);
    updateTotalCost();
    currentTax = 1;
});
document.getElementById("standardradio").addEventListener("change", function () {
    updateTax(0.05);
    updateTotalCost();
    currentTax = 2;
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

// document.getElementsByTagName("input")[1].addEventListener("change", function(){
//         alert("test");
// });