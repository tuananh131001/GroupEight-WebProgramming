
    let shoppingCart = [];

    function addToCart(productName, productPrice) {
        // Create an object representing the ordered item
        const orderedItem = {
            name: productName,
            price: productPrice,
        };

        // Add the ordered item to the shopping cart
        shoppingCart.push(orderedItem);

        // Calculate the total price
        updateTotalPrice();

        // Update the shopping cart display
        updateShoppingCartDisplay();
    }

    function removeFromCart(index) {
        // Remove the item from the shopping cart based on its index
        shoppingCart.splice(index, 1);

        // Calculate the total price
        updateTotalPrice();

        // Update the shopping cart display
        updateShoppingCartDisplay();
    }

    function updateShoppingCartDisplay() {
        const cartList = document.querySelector('#cart-list');
        cartList.innerHTML = ''; // Clear previous cart items

        shoppingCart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.name} - $${item.price} <button type="button" onclick="removeFromCart(${index})">Remove</button>`;
            cartList.appendChild(listItem);
        });
    }

    function updateTotalPrice() {
        let totalPrice = 0;
        shoppingCart.forEach(item => {
            totalPrice += item.price;
        });

        const cartTotal = document.querySelector('#cart-total');
        cartTotal.textContent = `Total: $${totalPrice}`;
    }

    function submitOrder() {
        // Create an array of ordered items with product name and price
        const orderedItems = shoppingCart.map(item => ({
            name: item.name,
            price: item.price,
        }));

        // Additional order details can be collected here if needed

        // Create a hidden input field to store the ordered items
        const orderedItemsInput = document.createElement('input');
        orderedItemsInput.type = 'hidden';
        orderedItemsInput.name = 'orderedItems';
        orderedItemsInput.value = JSON.stringify(orderedItems);

        // Append the hidden input field to the form
        const orderForm = document.querySelector('#order-form');
        orderForm.appendChild(orderedItemsInput);

        // Submit the form
        orderForm.submit();
    }