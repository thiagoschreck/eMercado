var currentProductsArray = [];
var currentCommentsArray = [];
var currentRelatedArray = [];
var product = {};

function showCarousel(array) {
    let htmlContentToAppend = "";
    let imageHTML = `
    <div class="carousel-item active">
    <img id="active-carousel-img" class="d-block w-100" onclick=zoomIn(\"prod-info-carousel\") src="`+ array[0] +`" alt="Slide `+ 1 +`">
    </div>
    `;
    let indicatorsHTML = `
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    `;
    
    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        imageHTML += `
            <div class="carousel-item" onclick=zoomIn(\"prod-info-carousel\")>
            <img class="d-block w-100" src="`+ imageSrc +`" alt="Slide `+ i +`">
            </div>
        `;

        indicatorsHTML += `
            <li data-target="#carouselExampleIndicators" data-slide-to="`+ i +`"></li>
        `;
    }

		htmlContentToAppend +=
			`
        <div id="prod-info-carousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">`
            + indicatorsHTML +
        `</ol>
        <div class="carousel-inner">`
            + imageHTML +
        `</div>
        <a class="carousel-control-prev" href="#prod-info-carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#prod-info-carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
        `;

		document.getElementById(
			"productImagesGallery"
		).innerHTML = htmlContentToAppend;
	
}

var carouselClicked = 0;
function zoomIn(elementID){
    let element = document.getElementById(elementID);
    if (carouselClicked === 0){
        saveStyle = element.style;
        element.style += `
            -ms-transform: scale(1.3) translateX(30%);; /* IE 9 */
            -webkit-transform: scale(1.3) translateX(30%);; /* Safari 3-8 */
            transform: scale(1.3) translateX("30%");
            margin: auto;
            cursor: -moz-zoom-out; 
            cursor: -webkit-zoom-out; 
            cursor: zoom-out;
        `
        carouselClicked = 1;
    }
    else{
        saveStyle = element.style;
        element.style = `
            padding: 0 0 0;
            padding-left: 15px;
            margin-right: 30px;
            transition: transform 0.5s;
            cursor: -moz-zoom-in; 
            cursor: -webkit-zoom-in; 
            cursor: zoom-in;
        `
        carouselClicked = 0;
    }

}

function mouseZoom(elementID){
    let element = document.getElementById(elementID)
    if (carouselClicked === 0){
    }
}

function createCard(object){
    let card = `
        <div class="card withzoom" style="width: 18em; height:23em; margin-right: 1em";>
        <img class="card-img-top" src="`+ object.imgSrc +`" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">`+ object.name +`</h5>
            <p class="card-text"><hr>`+ object.description +`</p>
        </div>
        </div>
    `
    return card;
}

function showRelatedProducts(array){

    let htmlContentToAppend = "";
		let product1 = array[1];
        let product2 = array[3]; 

            htmlContentToAppend += `
            <div style="display:flex;">
            <div> <a class="custom-card" href="./product-info.html" style="text-decoration: none;">`+
            createCard(product1) + `
            </div> </a>
            <div> <a class="custom-card" href="./product-info.html" style="text-decoration: none">` +
            createCard(product2) + `            
            </div> </a>
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
            showCarousel(product.images);
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
