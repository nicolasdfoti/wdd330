import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {

  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.taxes = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateSummary();
        this.calculateOrderTotal();
    }

    calculateSummary() {
        const itemNumElement = document.querySelector("#number_items");
        const subtotalElement = document.querySelector("#orderSubtotal");

        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map(item => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
        subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        this.taxes = this.itemTotal * 0.06;
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = this.itemTotal + this.taxes + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        document.querySelector("#taxes").innerText = `$${this.taxes.toFixed(2)}`;
        document.querySelector("#shipping").innerText = `$${this.shipping.toFixed(2)}`;
        document.querySelector("#orderTotal").innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkoutForm"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        try {
        const response = await services.checkout(order);
        console.log(response);
        } catch (err) {
        console.log(err);
        }
    }
}