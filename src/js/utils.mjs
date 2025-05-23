// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// reusable function to render a list of items using a template function.
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  const htmlStrings = list.map(templateFn);
  this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(''));
}

// reusable function that renders info with a template
export function renderWithTemplate(template, parentElement, data, callback) {
  
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// function that fetches the HTML file and turns it into a string
export async function loadTemplate(path) {

  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function that loads the header and footer
export async function loadHeaderFooter() {

  // Header
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  //Footer
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}