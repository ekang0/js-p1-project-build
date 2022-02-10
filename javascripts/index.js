//For javascript logic

/* GLOBALS */





/* NODE GETTERS */
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const productPageLink = () => document.getElementById("products-page-link");
let products = [];

/* TEMPLATES */
const homePageTemplate = () => {
  return `
  <div class="welcome-message">
  <h3>Hello Friend!</h3>
  <p>Thanks for stopping by our shop.</p>
  </div>
  `
};

const productListTemplate = () => {
  return `
    <h4 class="products-page">Products</h4>
    <div>
      ${renderProducts()}
    </div>
  `
};

/*
const productTemplate = (product) => {
  return `
    <div class="card-image">
      <img src="images/sample-1.jpg">
      <span class="card-title black-text">Product Name</span>
     <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">+</i></a>
    </div>
    <div class="card-content">
      <p class="product-information">Product information</p>
    </div>
  `
};
*/
const productTemplate = (product) => {
  return `
  <div class="container">
  <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src=${product.image}>
          <span class="card-title black-text">${product.title}</span>
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">+</i></a>
        </div>
        <div class="card-content">
          <p class="product-information">${product.description}</p>
          <p class="product-price">${product.price}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  `
};

/* MISC*/
//const resetMainDiv = () => {mainDiv().innerHTML = ""};


/* RENDERS */
const renderHomePage = () => {
  mainDiv().innerHTML = homePageTemplate();
};

const renderProductPage = () => { 
  mainDiv().innerHTML = productListTemplate();
};

const renderProducts = () => {
  products.forEach(product => {
    //console.log(product);
    productTemplate(product); 
  })
};

/* EVENTS */
/* const loadProducts = () => {
  fetch("https://fakestoreapi.com/products/category/jewelery")
  .then(response => response.json())
  .then(data => products = data)
;} */
const loadProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products/category/jewelery");
  const data = await response.json();
  products = data;
  //console.log(products)
};


const homePageLinkEvent = () => {
  homePageLink().addEventListener('click', (e) => {
    e.preventDefault();
    renderHomePage();
  })
};

const productPageLinkEvent = () => {
  productPageLink().addEventListener('click', async (e) => {
    e.preventDefault();
    await loadProducts();
    renderProductPage();
  })
};


/* */






/* WHEN THE DOM LOADS */
document.addEventListener('DOMContentLoaded',() => {
  renderHomePage();
  homePageLinkEvent();
  productPageLinkEvent();
  
});


