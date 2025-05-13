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

// reusable function to render a list of items using a template function.
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  console.log(list);

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlList = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, htmlList);
}