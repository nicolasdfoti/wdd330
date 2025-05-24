import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list");
const cart = new ShoppingCart(listElement);
cart.init();
