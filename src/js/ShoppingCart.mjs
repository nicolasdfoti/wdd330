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
    const cartItems = getLocalStorage(this.storageKey) || [];
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
  }
}