import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;;
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
}