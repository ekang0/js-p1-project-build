//For javascript logic

/* GLOBALS */





/* NODE GETTERS */
const mainDiv = () => document.getElementById("main");




/* TEMPLATES */
const homePageTemplate = () => {
  return `
  <h3>Hello Friend!</h3>
  <p>Thanks for stopping by our shop.</p>
  `
};




/* RENDERS */
const renderHomePage = () => {
  mainDiv().innerHTML = homePageTemplate();
}




/* */






/* WHEN THE DOM LOADS */

document.addEventListener('DOMContentLoaded',() => {
  //renderHomePage();

})


