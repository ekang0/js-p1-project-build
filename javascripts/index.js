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
  const thTotal = document.createElement("th");
  const tbodyCheckoutItemList = document.createElement("tbody");
  const tbodyCheckoutTotal = document.createElement("tbody");
  const trBodyCheckoutTotal = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const tdTotal = document.createElement("td");
  const strong = document.createElement("strong");
  
  table.className = "container";
  tbodyCheckoutItemList.className = "checkout-item-list";
  tbodyCheckoutTotal.className = "checkout-total-line";

  thItem.innerText = "Item";
  thItemPrice.innerText = "Item Price";
  thQuantity.innerText = "Quantity";
  // thTotal.innerText = "Total";
  // strong.innerText = "Total";

  trHead.appendChild(thItem);
  trHead.appendChild(thItemPrice);
  trHead.appendChild(thQuantity);
  // trHead.appendChild(thTotal);
  thead.appendChild(trHead);
  //tbodyCheckoutItemList.appendChild( `${ checkoutProductListTemplate() }` );

  cart.map(item => {
    tbodyCheckoutItemList.appendChild(checkoutProductListTemplate(item))
  });

  trBodyCheckoutTotal.appendChild(td1);
  trBodyCheckoutTotal.appendChild(td2);
  // tdTotal.appendChild(strong);
  trBodyCheckoutTotal.appendChild(tdTotal);
  //trBodyCheckoutTotal.appendChild( `${checkoutTotalTemplate()}` );
  tbodyCheckoutTotal.appendChild(trBodyCheckoutTotal);
  table.appendChild(thead);
  table.appendChild(tbodyCheckoutItemList);
  table.appendChild(tbodyCheckoutTotal);


  return table
  /*
  <button id="checkout-button" class="btn waves-effect waves-light right" type="submit" name="action">Checkout</button>
  `
  */
};



const checkoutProductListTemplate = (item) => {
  const tr = document.createElement("tr");
  const tdItem = document.createElement("td");
  const tdPrice = document.createElement("td");
  const tdQty = document.createElement("td");
  const tdTotalPrice = document.createElement("td");


  tr.className = ""
  tdItem.className = ""
  tdPrice.className = "item-price"
  tdQty.className = "item-qty"
  tdTotalPrice.className = "item-total"

  tdItem.innerText = item.name;
  tdPrice.innerText = `$${item.price}`
  tdQty.innerText = "1"
  // tdTotalPrice.innerText= ""

  tr.appendChild(tdItem);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQty);
  tr.appendChild(tdTotalPrice);

  return tr;
};


//still need to complete
// const checkoutTotalTemplate = () => {
//   return `
//     <td id="check-out-total"><strong>$</strong></td>
//   `
// };

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

let cart = [];
const renderProductPage = () => { 
  mainDiv().innerHTML = "";
  //productListTemplate() = h4
  let productIds = [];
  const h4 = document.createElement("h4");
  const div = document.createElement("div");
  h4.className = "products-page";
  h4.innerText = "Products";
  // renderProducts() and append to div
  products.map(product => {
    const productCol = productTemplate(product); 
    //console.log(productCol);
    div.appendChild(productCol);
    productIds.push(`${product.id}`);
    //console.log(product.id);
    //console.log(productIds);
  })

  h4.appendChild(div);
  mainDiv().appendChild(h4);
  //console.log(mainDiv().appendChild(h4));

  productIds.map(idNumber => {
    let addtoCartButton = document.getElementById(`product-add-btn-${idNumber}`);
    addtoCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      //console.log(e.target.closest(".container"))
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
  //mainDiv().innerHTML = checkoutListTemplate();
  //checkoutListTemplate()
  mainDiv().innerHTML = "";
  const div = document.createElement("div")
  const h4 = document.createElement("h4");
  const buttonCheckout = document.createElement("button");
  h4.className = "checkout-page";
  buttonCheckout.className = "btn waves-effect waves-light right";
  buttonCheckout.setAttribute("id", "checkout-button");
  buttonCheckout.setAttribute("type", "submit");
  buttonCheckout.setAttribute("name", "action");
  h4.innerText = "Basket";
  buttonCheckout.innerText = "Checkout"

  div.appendChild(h4);
  div.appendChild(checkoutListTemplate());
  div.appendChild(buttonCheckout);
  mainDiv().appendChild(div);

};

//still need to complete
/*const renderCheckout = (productDivCard) => {
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
*/

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
    //addToCartEvent();
  })
};

//still need to complete
/*
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
*/

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


