var currentProductsArray = [];

var precioCarrito = 0;
var impuestoCarrito = 0;
var totalCarrito = 0;

function loadCartList(array){
    
    let htmlContentToAppend = "";
    for (let i = 0; i < array.articles.length; i++) {
        let product = array.articles[i];
        let id = "articleRow" + i;

		htmlContentToAppend +=
            `
            <tr id="`+ id +`">
                <td style="width:15%"><img width="80%" src="`+ product.src +`" alt="placeholder"></td>
                <td>`+ product.name +`</td>
                <td>`+ product.currency + product.unitCost +`</td>
                <td><input type="number" id="product-count" min="1" value="`+ product.count +`"></td>
                <td>`+ product.currency + (product.unitCost * product.count) +`</td>
            </tr>
            `
        ;

		document.getElementById(
			"cuerpo-carrito"
        ).innerHTML = htmlContentToAppend;
        
        // document.getElementById(
        //     "articleRow0"
        // ).attributes("hidden")
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			loadCartList(resultObj.data);
		}
	});
});