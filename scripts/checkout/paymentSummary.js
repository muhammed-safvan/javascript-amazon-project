import { cart, getTotalCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { convertMoney } from "../utils/money.js";
import { getOrder } from "../orders/renderOrders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    if (deliveryOption.priceCents > shippingPriceCents) {
      shippingPriceCents += deliveryOption.priceCents;
    }
  });
  console.log(productPriceCents);
  console.log(shippingPriceCents);

  const totalBeforeTaxCents = shippingPriceCents + productPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalAfterTaxCents = taxCents + totalBeforeTaxCents;

  const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div
              class="js-items-container"
              >Items (${getTotalCartQuantity()}):</div>
            <div class="payment-summary-money">
                $${convertMoney(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${convertMoney(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${convertMoney(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${convertMoney(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${convertMoney(totalAfterTaxCents)}
            </div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
    
    `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document.querySelector(".js-place-order").addEventListener("click", () => {
    getOrder(cart);
    window.location.href = "orders.html";
  });

}
