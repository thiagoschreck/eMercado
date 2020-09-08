var currentProductsArray = [];
var currentCommentsArray = [];
var product = {};

function showImagesGallery(array) {
	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {
		let imageSrc = array[i];

		htmlContentToAppend +=
			`
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
			imageSrc +
			`" alt="">
            </div>
        </div>
        `;

		document.getElementById(
			"productImagesGallery"
		).innerHTML = htmlContentToAppend;
	}
}

function showComments(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < currentCommentsArray.length; i++) {
        let comment = currentCommentsArray[i];
		let user = comment.user;
		let score = comment.score;
        let date = comment.dateTime;
        
        htmlContentToAppend += 
        `
        <li class="list-group-item">
            <strong>` + user + `</strong>
             - ` + date + ` -
             ` + score + `             
        </li>
        `
    }
    document.getElementById("comments-list").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			product = resultObj.data;

			let productNameHTML = document.getElementById("productName");
			let productCostHTML = document.getElementById("productCost");
			let productDescriptionHTML = document.getElementById(
				"productDescription"
			);
			let productCategoryHTML = document.getElementById(
				"productCategory"
			);
			let productSoldCountHTML = document.getElementById(
				"productSoldCount"
			);

			productNameHTML.innerHTML = product.name;
			productCostHTML.innerHTML = "USD " + product.cost;
			productDescriptionHTML.innerHTML = product.description;
			productCategoryHTML.innerHTML =
				'<a href="./category-info.html">' + product.category + "</a>";
			productSoldCountHTML.innerHTML = product.soldCount;

			//Muestro las imagenes en forma de galería
			showImagesGallery(product.images);
		}
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
			comment = resultObj.data;
            showComments();
        }
    });
    // TODO Related products
    // 
    // getJSONData(PRODUCTS_URL).then(function(resultObj){
    //     if (resultObj.status === "ok") {
    //         relProduct = resultObj.data;
    // 
    //         let relProductNameHTML = document.getElementById("productName");
	// 		let relProductDescriptionHTML = document.getElementById(
	// 			"productDescription"
	// 		);
    //     }
    // });

});
