//use dayjs to get the time and date
import { addToCart } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";

document.querySelector(".js-cart-quantity").innerText =
  localStorage.getItem("totalCart") || '';
loadProductsFetch().then(() => {
  loadPage();
});

function loadPage() {
  products.forEach((product) => {
    document.querySelector(".js-product-grid").innerHTML += `
                <div class="product-container js-product-container">
                    <div class="product-image-container">
                        <img class="product-image"
                        src=${product.image}>
                    </div>
            
                    <div class="product-name limit-text-to-2-lines">
                        ${product.name}
                    </div>
            
                    <div class="product-rating-container">
                        <img class="product-rating-stars"
                        src="${product.getStarsImage()}">
                        <div class="product-rating-count link-primary">
                        ${product.rating.count}
                        </div>
                    </div>
            
                    <div class="product-price">
                        ${product.getPrice()}
                    </div>
            
                    <div class="product-quantity-container">
                        <select class="js-quantity-select-${product.id}
                            js-quantity-select">                       
                        
                        </select>
                    </div>

                    ${product.addExtraInfoHTML()}

                    <div class="product-spacer"></div>
            
                    <div class="added-to-cart
                      js-added-to-cart-${product.id}">
                        <img src="images/icons/checkmark.png">
                        Added
                    </div>
            
                    <button class="add-to-cart-button button-primary 
                    js-add-to-cart-button" data-button-id=${product.id}>
                        Add to Cart
                    </button>
                    </div>
       
        `;
    selectQuantity(product.id);
  });

  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    let { buttonId } = button.dataset;
    let timeoutId = null;
    button.addEventListener("click", () => {
      const element = document.querySelector(`.js-added-to-cart-${buttonId}`);
      element.classList.add("added-product");

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        element.classList.remove("added-product");
      }, 2000);

      addToCart(buttonId);
      document.querySelector(".js-cart-quantity").innerText = addToCart();
    });
  });

  document.querySelector(".js-cart-quantity").innerText = addToCart();
}

function selectQuantity(productId) {
  const html = `
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    `;
  document.querySelector(`.js-quantity-select-${productId}`).innerHTML = html;
}

