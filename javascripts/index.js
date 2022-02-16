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
//const checkoutItemList = () => document.getElementById("checkout-item-list");


/* TEMPLATES */
const productTemplate = (product) => {
  const containerDiv = document.createElement("div");
  const rowDiv = document.createElement("div");
  const colDiv = document.createElement("div");
  const cardDiv = document.createElement("div");
  const cardImageDiv = document.createElement("div");
  const imageTag = document.createElement("img");
  const productAddBtn = document.createElement("a");
  const addBtnIcon = document.createElement("i");
  const cardContentDiv= document.createElement("div");
  const cardTitleSpan = document.createElement("span");
  const productInfo = document.createElement("p");
  const productPrice = document.createElement("p");
  
  containerDiv.className = "container";
  rowDiv.className = "row";
  colDiv.className = "col s12 m5";
  cardDiv.className = "card";
  cardImageDiv.className = "card-image";
  productAddBtn.className = "btn-floating halfway-fab waves-effect waves-light blue-grey darken-3";
  addBtnIcon.className = "material-icons";
  cardContentDiv.className = "card-content";
  cardTitleSpan.className = "card-title black-text";
  productInfo.className = "product-information";
  productPrice.className = "product-price";

  cardImageDiv.setAttribute("margin", "50px");
  imageTag.setAttribute("src", `${product.image}`);
  imageTag.setAttribute("alt", `${product.title}`);
  imageTag.setAttribute("height", "300px");
  imageTag.setAttribute("width", "50px");
  productAddBtn.setAttribute("id", `product-add-btn-${product.id}`);

  addBtnIcon.innerText = "+";
  cardTitleSpan.innerText = product.title;
  productInfo.innerText = product.description;
  productPrice.innerText = `$${product.price}`;

  cardContentDiv.appendChild(cardTitleSpan);
  cardContentDiv.appendChild(productInfo);
  cardContentDiv.appendChild(productPrice);
  productAddBtn.appendChild(addBtnIcon);
  cardImageDiv.appendChild(imageTag);
  cardImageDiv.appendChild(productAddBtn);
  cardDiv.appendChild(cardImageDiv);
  cardDiv.appendChild(cardContentDiv);
  colDiv.appendChild(cardDiv);
  rowDiv.appendChild(colDiv);
  containerDiv.appendChild(rowDiv);

  return containerDiv;
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

    <tbody class="checkout-item-list">
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
const checkoutProductListTemplate = (item, price, qty, total) => {
return `
      <tr>
        <td>Alvin</td>
        <td>$0.87</td>
        <td>1</td>
        <td>$0.87</td>
      </tr>
      `
  /*
  return `
    <tr>
      <td>${item}</td>
      <td>$${price}</td>
      <td>${qty}</td>
      <td>$${total}</td>
    </tr>
  `
  */
};

//still need to complete
const checkoutTotalTemplate = () => {
  return `
    <td id="check-out-total"><strong>$</strong></td>
  `
};

/* MISC*/
//const resetMainDiv = () => {mainDiv().innerHTML = ""};


/* RENDERS / EVENT HANDLERS */
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
  mainDiv().innerHTML = "";
  //productListTemplate() = h4
  const h4 = document.createElement("h4");
  const div = document.createElement("div");
  h4.className = "products-page";
  h4.innerText = "Products";

  // renderProducts() and append to div
  products.map(product => {
    const productCol = productTemplate(product); 
    //console.log(productCol);
    div.appendChild(productCol);
  })

  h4.appendChild(div);
  
  mainDiv().appendChild(h4);
};

const renderCheckoutPage = () => {
  mainDiv().innerHTML = checkoutListTemplate();
};

//still need to complete
const renderCheckout = (productDivCard) => {
  //console.log(productDivCard);
  let item = productDivCard.getElementsByClassName("card-title black-text")[0].innerText;
  let price = productDivCard.getElementsByClassName("product-price")[0].innerText.substring(1);
  let qty = 1;
  let total = `${price * qty}`;
 
  //console.log(item);
  //console.log(price);
  //console.log(qty);
  //console.log(total);

  console.log(checkoutProductListTemplate(item, price, qty, total));

};


/* EVENTS / EVENT LISTENERS */
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
    // console.log(e.target.parentNode.parentNode.parentNode);
    const productDivCard = e.target.parentNode.parentNode.parentNode;
    // checkoutProductListTemplate(productDivCard);
    //console.log(productDivCard);
    //console.log(productDivCard.getElementsByClassName("card-title black-text")[0].innerText);

    renderCheckout(productDivCard);

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
// const resetMain = () => {
//   mainDiv().innerHTML = "";
// }



/* WHEN THE DOM LOADS */
document.addEventListener('DOMContentLoaded',() => {
  renderHomePage();
  homePageLinkEvent();
  productPageLinkEvent();
  checkoutPageLinkEvent();

});


