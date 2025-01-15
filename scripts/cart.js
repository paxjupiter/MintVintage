// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.getElementById("cartTableBody");
    
    // Check if cartTableBody exists before trying to access it
    if (!cartTableBody) {
        console.log("Cart table body not found in the DOM.");
        return; // Exit early if the element doesn't exist
    }

    displayCart();
});

function displayCart() {
    const cartTableBody = document.getElementById("cartTableBody");
    const cartTotal = document.getElementById("cartTotal");

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
        cartTotal.textContent = "$0.00";
        return;
    }

    let cartHtml = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemTotal = parseFloat(item.price);
        total += itemTotal;
        cartHtml += `
            <tr>
                <td>${item.name}</td>
                <td class=card-col>
                    <img src="${item.front}" alt="Front of ${item.name}" class="card-cart" />
                    <img src="${item.back}" alt="Back of ${item.name}" class="card-cart" />
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>${item.description}</td>
                <td><button id="remove-button" onclick="removeFromCart('${item.name}')">Remove</button></td>
            </tr>
        `;
    });

    // Update the cart table with the items
    cartTableBody.innerHTML = cartHtml;

    // Display total price in the footer
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(itemName) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove the item with the given name
    cartItems = cartItems.filter(item => item.name !== itemName);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Re-display the cart after removing the item
    displayCart();
}



function purchasePopUp() {
    alert("Thank you for your purchase!");
}
