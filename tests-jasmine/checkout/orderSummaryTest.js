import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage ,cart} from '../../data/cart.js';
import {  loadProductsFetch } from '../../data/products.js';


describe ('test suit: renderOrderSummary' , ()=>{

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {

        spyOn(localStorage,'setItem');

        document.querySelector('.js-test-container').innerHTML = 
            `
            <div class = "js-order-summary"></div>
            <div class = "js-payment-summary"></div>

            `;

        spyOn(localStorage,'getItem').and.callFake(()=>{
            
            return JSON.stringify([
                {
                    id: productId1,
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    priceCents: 1090,
                    quantity:1,
                    deliveryOptionId: '1'
                },{
                    id: productId2,
                    image: "images/products/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    priceCents: 2095,
                    quantity:2,
                    deliveryOptionId: '2'
                }
            ]);            
        });
        loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {      
        document.querySelector('.js-test-container').innerHTML = '';
    });


    it ('display cart items' , ()=>{
          
        expect (document.querySelectorAll('.js-cart-item-container')
        .length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`)
        .innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId2}`)
        .innerText).toContain('Quantity: 2');

    });


    it('remove cart item',() => {
       
        document.querySelector(`.js-delete-button-${productId1}`).click();
        expect (document.querySelectorAll('.js-cart-item-container')
        .length).toEqual(1);
        expect (document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect (document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId2);

    });
});