import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list");
const cart = new ShoppingCart(listElement);
cart.init();

const totalPriceElement = document.querySelector("#total-price");
const total = cart.calculateTotal();
totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;