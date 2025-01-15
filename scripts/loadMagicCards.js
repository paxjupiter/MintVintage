// LOAD MAGIC CARD DATA from a text file
//this is called in the loadContent() function. See above for thorough documentation - this is effectively a copy of the loadPokemonData() function
function loadMTGData() {
    
    fetch('./textfiles/magiccards.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
    //PARSE DATA
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

        //CONSOLE log to make sure all products are parsed
        console.log(products);

    //THROWS error if text file is empty
    if (products.length === 0) {
        throw new Error('No valid product data found');
    }

    //INNER HTML structure for each product
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
