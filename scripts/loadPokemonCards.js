// LOAD POKEMON CARD DATA from a text file
document.addEventListener("DOMContentLoaded", function() {
    loadPokemonData();
});



//this is called in the loadContent() function - most efficient way to avoid conflicting "onload" calls in the html. Will likely use this for all content. See loadContent() for additional notes.
function loadPokemonData() {
    //console.log("loadPokemonData called.")
    //check for productContainer
    const productContainer = document.getElementById('productContainer');
    
    if (!productContainer) {
        console.log("productContainer not found in the DOM.");
        return; // Exit the function if the element doesn't exist
    }

    fetch('textfiles/pokemoncards.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
    //PARSE DATA - info is parsed at newline instead of pipe, fields are defined at ': ' (colon and space) instead of ampersand. This makes the text file easier to read and update on the back end.
    .then(data => {
        const products = data.split(/\n\s*\n/).map(item => {
            const product = {};
            item.split('\n').forEach(line => {
                const [key, value] = line.split(': ');
                if (key && value) { // Check if key and value exist
                    product[key.trim()] = value.trim();
                }
            });
            return product;
        //FILTER OUT empty lines
        }).filter(product => Object.keys(product).length > 0);

        //CONSOLE log to make sure all products are parsed and none are skipped. Good for debugging, but would want to hide this on production.
        console.log(products);

    //THROWS error if text file is empty
    if (products.length === 0) {
        throw new Error('No valid product data found');
    }

    //INNER HTML structure for each product
    //let is used here instead of var or const to limit scope of productHTML to this specific forEach loop. Prevents unpredicatble behavior if/when productHTML is used elsewhere (which it will be for other product pages)
    let productHtml = '';
    products.forEach(product => {
        productHtml += `
            <div class="product">
                <br>
                <br>
                <img src="${product.front}" alt="Card Front" class="card-image">
                <img src="${product.back}" alt="Card Back" class="card-image">
                <br>
                <h2 class="inline">${product.name}</h2>
                <h4 class="inline price">$${product.price}</h4>
                <p>${product.description}</p>
                <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                <br>
                <br>
            </div>
        `;
    });

    //FILL CONTAINER with innerHTML 
    document.getElementById('productContainer').innerHTML = productHtml;

            // Add event listeners for "Add to Cart" buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => console.error('Error loading product data:', error));
}

function addToCart(event) {
    const product = JSON.parse(event.target.getAttribute('data-product'));

    // Get existing cart or create an empty one if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the selected product to the cart
    cart.push(product);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} has been added to your cart!`);
}