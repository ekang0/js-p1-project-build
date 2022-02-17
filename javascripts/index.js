//For javascript logic

/* GLOBALS */
let products = [];
let cart = [];


/* NODE GETTERS */
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const productPageLink = () => document.getElementById("products-page-link");
const checkoutPageLink = () => document.getElementById("checkout-page-link");
const checkOutButton = () => document.getElementById("checkout-button");


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
  const table = document.createElement("table"); 
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  const thItem = document.createElement("th");
  const thItemPrice = document.createElement("th");
  const thQuantity = document.createElement("th");
  const tbodyCheckoutItemList = document.createElement("tbody");
  
  table.className = "container";
  tbodyCheckoutItemList.className = "checkout-item-list";

  thItem.innerText = "Item";
  thItemPrice.innerText = "Item Price";
  thQuantity.innerText = "Quantity";

  trHead.appendChild(thItem);
  trHead.appendChild(thItemPrice);
  trHead.appendChild(thQuantity);
  thead.appendChild(trHead);

  cart.map(item => {
    tbodyCheckoutItemList.appendChild(checkoutProductListTemplate(item))
  });

  table.appendChild(thead);
  table.appendChild(tbodyCheckoutItemList);

  return table
};


const checkoutProductListTemplate = (item) => {
  const tr = document.createElement("tr");
  const tdItem = document.createElement("td");
  const tdPrice = document.createElement("td");
  const tdQty = document.createElement("td");

  tr.className = "checkout-products";
  tdItem.className = "item-name";
  tdPrice.className = "item-price";
  tdQty.className = "item-qty";

  tdItem.innerText = item.name;
  tdPrice.innerText = `$${item.price}`;
  tdQty.innerText = "1";

  tr.appendChild(tdItem);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQty);

  return tr;
};


/* MISC*/


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
  let productIds = [];
  const h4 = document.createElement("h4");
  const div = document.createElement("div");
  h4.className = "products-page";
  h4.innerText = "Products";
  // render products and append to div
  products.map(product => {
    const productCol = productTemplate(product); 
    div.appendChild(productCol);
    productIds.push(`${product.id}`);
  });

  h4.appendChild(div);
  mainDiv().appendChild(h4);

  productIds.map(idNumber => {
    let addtoCartButton = document.getElementById(`product-add-btn-${idNumber}`);
    addtoCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      let cartItem = e.target.closest(".container");
      let cartItemName = cartItem.querySelector("span").innerText;
      let cartItemPrice = parseFloat(cartItem.querySelector(".product-price").innerText.substring(1));
      let cartItemAdd = {
        name: cartItemName,
        price: cartItemPrice
      };
      cart.push(cartItemAdd);
    });
  });
};


const renderCheckoutPage = () => {
  mainDiv().innerHTML = "";
  const div = document.createElement("div");
  const h4 = document.createElement("h4");
  const buttonCheckout = document.createElement("button");

  h4.className = "checkout-page";
  buttonCheckout.className = "btn waves-effect waves-light right";

  buttonCheckout.setAttribute("id", "checkout-button");
  buttonCheckout.setAttribute("type", "submit");
  buttonCheckout.setAttribute("name", "action");

  h4.innerText = "Cart";
  buttonCheckout.innerText = "Checkout";

  div.appendChild(h4);
  div.appendChild(checkoutListTemplate());
  div.appendChild(buttonCheckout);

  mainDiv().appendChild(div);
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
