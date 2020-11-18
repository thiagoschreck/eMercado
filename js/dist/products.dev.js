"use strict";

var ORDER_ASC_BY_PRICE = "Asc";
var ORDER_DESC_BY_PRICE = "Desc";
var ORDER_DESC_BY_RELEVANCE = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
var texto = undefined;

function sortProducts(criteria, array) {
  var result = [];

  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }

      if (a.cost > b.cost) {
        return 1;
      }

      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }

      if (a.cost < b.cost) {
        return 1;
      }

      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
    result = array.sort(function (a, b) {
      var aCount = parseInt(a.soldCount);
      var bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }

      if (aCount < bCount) {
        return 1;
      }

      return 0;
    });
  }

  return result;
}

function showProductsList() {
  var htmlContentToAppend = "";

  for (var i = 0; i < currentProductsArray.length; i++) {
    var product = currentProductsArray[i];
    var nombreProducto = product.name.toLowerCase();
    var descProducto = product.description.toLowerCase();

    if ((minCost == undefined || minCost != undefined && parseInt(product.cost) >= minCost) && (maxCost == undefined || maxCost != undefined && parseInt(product.cost) <= maxCost) && (descProducto.indexOf(texto) !== -1 || nombreProducto.indexOf(texto) !== -1)) {
      htmlContentToAppend += "\n            <div class=\"list-group-item list-group-item-action\">\n                <div class=\"row\">\n                    <div class=\"col-3\">\n                        <img src=\"" + product.imgSrc + "\" alt=\"" + product.description + "\" class=\"img-thumbnail\">\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"d-flex w-100 justify-content-between\">\n                            <h4 class=\"mb-1\">" + product.name + "</h4>\n                            <small class=\"text-muted\">" + product.soldCount + " vendidos<br></small>\n                        </div>\n                        <div>" + product.description + "</div>\n                        <div id=\"precio\">" + product.currency + " " + product.cost + "</div>\n                        \n                    </div>\n                </div>\n            </div>\n        ";
    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
  }
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //Muestro las categorías ordenadas

  showProductsList();
} //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
  //     getJSONData(PRODUCTS_URL).then(function(resultObj) {
  //         if (resultObj.status === "ok") {
  //             categoriesArray = resultObj.data;
  //             //Muestro las categorías ordenadas
  //             showCategoriesList(categoriesArray);
  //         }
  //     });
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
    }
  });
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });
  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });
  document.getElementById("sortRel").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
  });
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";
    texto = undefined;
    minCost = undefined;
    maxCost = undefined;
    filtrar();
    showProductsList();
  });
  document.getElementById("rangeFilterCost").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
      minCost = parseInt(minCost);
    } else {
      minCost = undefined;
    }

    if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
      maxCost = parseInt(maxCost);
    } else {
      maxCost = undefined;
    }

    showProductsList();
  });
});

var filtrar = function filtrar() {
  texto = searchBar.value.toLowerCase();
  showProductsList();
}; // Ejecuta cuando se presiona la X en la search bar.


$('input[type=search]').on('search', function () {
  filtrar();
});
searchBar.addEventListener('keyup', filtrar);
filtrar();