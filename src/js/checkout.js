import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".summary");

document.addEventListener("DOMContentLoaded", () => {
  checkout.init();

  document
    .querySelector("#zip")
    .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));

  document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    const myForm = document.forms["checkoutForm"];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();

    if (chk_status) {
      checkout.checkout();
    }
  });
});
