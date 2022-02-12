//For javascript logic

/* GLOBALS */





/* NODE GETTERS */
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const productPageLink = () => document.getElementById("products-page-link");
let products = [];
const productAddButton = () => document.getElementById("product-add-btn");
const checkoutPageLink = () => document.getElementById("checkout-page-link");
const checkOutButton = () => document.getElementById("checkout-button");


/* TEMPLATES */

const productListTemplate = () => {
  return `
    <h4 class="products-page">Products</h4>
    <div>
      ${ renderProducts() }
    </div>
  `
};

const productTemplate = (product) => {
  return `
  <div class="container">
    <div class="row">
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image" margin="50px">
            <img src=${product.image} alt=${product.title} height="300px" width="50px">
            <a class="btn-floating halfway-fab waves-effect waves-light blue-grey darken-3" id="product-add-btn"><i class="material-icons">+</i></a>
          </div>
          <div class="card-content">
            <span class="card-title black-text">${product.title}</span>
            <p class="product-information">${product.description}</p>
            <p class="product-price">$${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
};

const checkoutListTemplate = () => {
  return `
  <h4 class="checkout-page">Basket</h4>
  <table class="container">
    <thead>
      <tr>
          <th>Item</th>
          <th>Item Price</th>
          <th>Quantity</th>
          <th>Total</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Alvin</td>
        <td>$0.87</td>
        <td>1</td>
        <td>$0.87</td>
      </tr>
      ${ checkoutProductListTemplate() }
    </tbody>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td><strong>Total</strong></td>
       ${ checkoutTotalTemplate() }
      </tr>
    </tbody>
  </table>
  <button id="checkout-button" class="btn waves-effect waves-light right" type="submit" name="action">Checkout</button>
  `
};

//still need to complete
const checkoutProductListTemplate = () => {
  return `
    <tr>
      <td>Alvin</td>
      <td>$0.87</td>
      <td>1</td>
      <td>$0.87</td>
    </tr>
  `
};

//still need to complete
const checkoutTotalTemplate = () => {
  return `
    <td id="check-out-total"><strong>$</strong></td>
  `
};

/* MISC*/
//const resetMainDiv = () => {mainDiv().innerHTML = ""};


/* RENDERS */
const renderHomePage = () => {
  mainDiv().innerHTML = "";
  const div = document.createElement("div");
  div.className ="welcome-message";
  const h3 = document.createElement("h3");
  h3.innerText = "Hello Friend!";
  const p = document.createElement("p");
  p.innerText = "Welcome to our shop!";
  div.appendChild(h3);
  div.appendChild(p);
  mainDiv().appendChild(div);
};

const renderProductPage = () => { 
  mainDiv().innerHTML = productListTemplate();
};

//note - don't forget need to return! 
const renderProducts = () => {
  return products.map(product => {
    return productTemplate(product) 
  }).join("")
};


const renderCheckoutPage = () => {
  mainDiv().innerHTML = checkoutListTemplate();
};

//still need to complete
const renderCheckout = () => {
  return 
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
    addToCartEvent();
  })
};


//still need to complete
const addToCartEvent = () => {
  productAddButton().addEventListener("click", (e) => {
    e.preventDefault();
    //alert('added');
    console.log(e);


  })
};

const checkOutEvent = () => {
  checkOutButton().addEventListener("click", (e) => {
    e.preventDefault();
    alert('Thank you for shopping with us! You will receive a confirmation email containing your order summary.')
  })
};

const checkoutPageLinkEvent = () => {
  checkoutPageLink().addEventListener("click", (e) => {
    e.preventDefault();
    renderCheckoutPage();
    checkOutEvent();
  })
};


/* */






/* WHEN THE DOM LOADS */
document.addEventListener('DOMContentLoaded',() => {
  renderHomePage();
  homePageLinkEvent();
  productPageLinkEvent();
  checkoutPageLinkEvent();

});


