var currentProductsArray = [];
var currentCommentsArray = [];
var currentRelatedArray = [];
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

function showRelatedProducts(array){

    let htmlContentToAppend = "";
		let product1 = array[1];
        let product2 = array[3]; 

            htmlContentToAppend += `
            <div style="display:flex;">
            <div style="width: 250px; margin-right: 0.5rem">
                ` + product1.name + `<br> <img class="img-fluid img-thumbnail" width="100%" src="` + product1.imgSrc + `" alt=""></img>
            </div>
            <div style="width: 250px">
                ` + product2.name + `<br> <img class="img-fluid img-thumbnail" width="100%" src="` + product2.imgSrc + `" alt=""></img>
            </div>
            </div>
            `
        document.getElementById("productRelated").innerHTML = htmlContentToAppend;
}

function showComments(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
		let comment = array[i];  
		let stars = "";

		for (let i=0; i<comment.score; i++){
			stars += `
				<span class="fa fa-star checked"></span>
			`;
		}
		for (let i=comment.score; i<5; i++){
			stars += `
				<span class="fa fa-star"></span>
			`;
		}
		
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <i class="fas fa-user"></i>`+ " " + comment.user +`
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">` + stars + `
                            <small class="text-muted">` + comment.dateTime + ` </small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("productComments").innerHTML = htmlContentToAppend;
	}
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
});
	
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentCommentsArray = resultObj.data;
            showComments(currentCommentsArray);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentRelatedArray = resultObj.data;
            showRelatedProducts(currentRelatedArray);
        }
    });
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
