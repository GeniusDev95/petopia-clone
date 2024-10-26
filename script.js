let item_Count = 0;

function itemCount(input){
    item_Count += input;
    document.getElementById('item-count').innerHTML= item_Count;
    alert('Item has been added into the cart')
}
console.log(item_Count)

function resetCart(){
    document.getElementById('item-count').innerHTML= item_Count;

}

document.addEventListener('DOMContentLoaded', function() {
    let total = 0;
    const cartItemsDiv = document.getElementById('cart-items');
    const cart = {}; // Object to store product quantities

    // Populate product buttons with event listeners
    const buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        if (button.classList.contains('add-to-cart')) {
            button.addEventListener('click', function() {
                // Get the product name and price from the product elements
                const productName = this.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                const productPrice = parseFloat(this.previousElementSibling.getAttribute('data-price'));
                console.log("price", productPrice)
                // Update quantity and total price
                if (cart[productName]) {
                    cart[productName].quantity += 1; // Increase quantity
                } else {
                    cart[productName] = { price: productPrice, quantity: 1 }; // Add new product
                }
                total += productPrice; 
                updateTotalPrice();

                updateCartDisplay();
            });
        }
    }

    function updateTotalPrice() {
        document.getElementById('total-price').textContent = total.toFixed(2);
    }

    function updateCartDisplay() {
        cartItemsDiv.innerHTML = ''; 
        for (const name in cart) {
            const { price, quantity } = cart[name];
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `<span>${name}</span> <span>${quantity}</span> <span>$${(price * quantity).toFixed(2)}  </span> `;
            // cartItemsDiv.appendChild(itemDiv); 
            document.getElementById('cart-items').appendChild(document.createElement('div')) ;
        }
    }

    
    document.getElementById('clear-cart').addEventListener('click', function() {
        total = 0; 
        item_Count = 0;
        resetCart();
        updateTotalPrice();
        cartItemsDiv.innerHTML = ''; 
        for (const key in cart) {
            delete cart[key]; // Clear the cart object
        }
    });
});