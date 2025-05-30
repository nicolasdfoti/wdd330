import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.NameWithoutBrand}" />
      </a>
      <div class="cart-card__info">
        <h2 class="card__name">${item.NameWithoutBrand}</h2>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${item.Quantity ?? 1}</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </div>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.storageKey = "so-cart";
  }

  init() {
    this.cartItems = getLocalStorage(this.storageKey) || [];

    if (this.cartItems.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty!</p>";
      document.querySelector("#cart-total").style.display = "none";
      return;
    }

    else {
      renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems);
    }
  }

  calculateTotal() {
    return this.cartItems.reduce((total, item) => {
      const quantity = item.Quantity ?? 1;
      return total + item.FinalPrice * quantity;
    }, 0);
  }
}