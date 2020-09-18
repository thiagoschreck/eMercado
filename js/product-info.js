const commentForm = document.getElementById("commentForm");
var currentProductsArray = [];
var currentCommentsArray = [];
var currentRelatedArray = [];
var productInfo = [];
var product = {};
var carouselClicked = 0;
var rating = 0;
var commentID = 1;
var commentContent = {
    description: '',
    score: '',
    dateTime: '',
    user: ''
}

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

function zoomIn(elementID){
    let element = document.getElementById(elementID);
    if (carouselClicked === 0){
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

function showRelatedProducts(productArray, relatedProducts){
    let htmlContentToAppend = "";
    for (let i=0; i<relatedProducts.length; i++){
        htmlContentToAppend += `
        <div> 
            <a class="custom-card" href="./product-info.html" style="text-decoration: none;">`+
                createCard(productArray[relatedProducts[i]]) + `
            </a>
        </div> 
        `
        document.getElementById("productRelated").innerHTML = htmlContentToAppend;
    }
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
                            <h5 class="mb-4">` + stars + `
                            <small class="text-muted">` + comment.dateTime + ` </small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
            </div>
            `
    }
    document.getElementById("productComments").innerHTML += htmlContentToAppend;
}

function fillStars(number){
    for (let i=1; i<=number; i++){
        let starID = "star" + i;
        document.getElementById(starID).className="fa fa-star checked";
        console.log("Checking " + starID);
    }
}

function emptyStars(number){
    for (let i=1; i<=number; i++){
        let starID = "star" + i;
        let chkstarID = "chkstar" + i;
        if (document.getElementById(chkstarID).checked === false){
            document.getElementById(starID).className="fa fa-star-o";
            console.log("Unchecking " + starID);
        }
    }
}

function changeRate(number){
    if (number != rating){
        rating = number;
        for (let i=1; i<=rating; i++){
            let starID = "star" + i;
            let chkstarID = "chkstar" + i;
            document.getElementById(starID).className="fa fa-star checked";
            document.getElementById(chkstarID).checked = true;
            console.log("Checking " + starID);
        }
        for (let i=5; i>rating; i--){
            let starID = "star" + i;
            let chkstarID = "chkstar" + i;
            document.getElementById(starID).className="fa fa-star-o";
            document.getElementById(chkstarID).checked = false;
            console.log("Unchecking " + starID);
        }
    }
    console.log(rating);
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
            getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    productInfo = resultObj.data;
                    //Formatea productInfo para que solo tome relatedProducts y los
                    //convierta en un array
                    productInfo = JSON.stringify(productInfo.relatedProducts);
                    productInfo = productInfo.replace("[","").replace("]","")
                    productInfo = productInfo.split(",")
                    showRelatedProducts(currentRelatedArray, productInfo);
                }
            })
        }
    });

    document.getElementById("star1").addEventListener("mouseup", function(e){
        changeRate(1);
    });
    document.getElementById("star2").addEventListener("mouseup", function(e){
        changeRate(2);
    });
    document.getElementById("star3").addEventListener("mouseup", function(e){
        changeRate(3);
    });
    document.getElementById("star4").addEventListener("mouseup", function(e){
        changeRate(4);
    });
    document.getElementById("star5").addEventListener("mouseup", function(e){
        changeRate(5);
    });
    document.getElementById("star1").addEventListener("mouseover", function(e){
        fillStars(1);
    });
    document.getElementById("star2").addEventListener("mouseover", function(e){
        fillStars(2);
    });
    document.getElementById("star3").addEventListener("mouseover", function(e){
        fillStars(3);
    });
    document.getElementById("star4").addEventListener("mouseover", function(e){
        fillStars(4);
    });
    document.getElementById("star5").addEventListener("mouseover", function(e){
        fillStars(5);
    });
    document.getElementById("star1").addEventListener("mouseleave", function(e){
        emptyStars(1);
    });
    document.getElementById("star2").addEventListener("mouseleave", function(e){
        emptyStars(2);
    });
    document.getElementById("star3").addEventListener("mouseleave", function(e){
        emptyStars(3);
    });
    document.getElementById("star4").addEventListener("mouseleave", function(e){
        emptyStars(4);
    });
    document.getElementById("star5").addEventListener("mouseleave", function(e){
        emptyStars(5);
    });

    commentForm.addEventListener("submit", function (event){
        event.preventDefault();
        commentContent.description = document.getElementById("commentArea").value;
        commentContent.score = rating;
        commentContent.dateTime = new Date().toLocaleString()
        commentContent.user = sessionStorage.getItem("usuario");
        showComments([commentContent]);
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