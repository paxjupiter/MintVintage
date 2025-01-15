/*
CIT 152 - WEEK 3  Assignment - MintVintage Registration Page
JavaScript
AUTHOR: PAX MONTORO
UPDATED: 09/25/2024
*/

/*SHOW REGISTRATION FORM ON LOGIN BUTTON CLICK
show registration interface on submit of login

Don't know how to validate login yet so this will happen no matter 
what the user types in username and password

"return false" needs to be included with the function call in the 
HTML file to make sure the div stays displayed*/
function showRegistration(){
    var regDiv = document.getElementById("registrationDiv");
    regDiv.style.display = "block";
}//end showRegistration

function validateForm() {
    
    //DECLARE VARIABLES - form field values

    var username = document.forms["registrationForm"]["username"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var phone = document.forms["registrationForm"]["phone"].value;


    //DEFINE REGEX - email, phone, password patterns
    
    //valid email has: 
        //alphanumeric characters or ".","_","-"
        //followed by "@"
        //followed by alphanumeric characters or ".", "-"
        //followed by alpha, 2-6 characters in length)

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    //valid phone number has:
        //10 digits, not separated by parethesis, whitespace, or hyphens

    var phonePattern = /^\d{10}$/;

    //valid password has:
        //at least one uppercase letter
        //at least one lowercase letter
        //at least one number
        //at least one one symbol

    var hasUpperCase = /[A-Z]/;
    var hasLowerCase = /[a-z]/;
    var hasNumbers = /\d/;
    var hasNonalphas = /\W/;

    //USERNAME must not be blank

    if (username == "") {
        alert("Please enter a username.");
        return false;
    }

    //PASSWORD must not be blank

    if (password == "") {
        alert("You need a password!");
        return false;
    }

    //PASSWORD must be at least 8 characters

    if (password.length < 8){
        alert("Password must be at least 8 characters.");
        return false;
    }

    //PASSWORD must meet minimum strength requirements

    if (!hasUpperCase.test(password)) {
        alert("Password must have at least one uppercase letter.");
        return false;
    }
    
    if (!hasLowerCase.test(password)) {
        alert("Password must have at least one lowercase letter.");
        return false;
    }
        
    if (!hasNumbers.test(password)) {
        alert("Password must have at least one Number.");
        return false;
    }

    if (!hasNonalphas.test(password)) {
        alert("Password must have at least one symbol.");
        return false;
    }

    //CONFIRM PASSWORD must not be blank

    if (confirmPassword == "") {
        alert("Please confirm your password!");
        return false;
    }

    //PASSWORD and CONFIRM PASSWORD must match

    if (password != confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    //EMAIL must not be blank
    if (email == "") {
        alert("You need to enter an email address!");
        return false;
    }

    //EMAIL must match regex pattern
    if (!emailPattern.test(email)) {
        alert("The email you entered is not a valid email address.");
        return false;
    }

    //PHONE NUMBER must not be blank
    if (phone == "") {
        alert("Phone number is required!");
        return false;
    }

    //PHONE NUMBER must match regex pattern
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number (no spaces or symbols).");
        return false;
    }

    return true;
}//end validateForm

//LOAD SITE NAVIGATION MENU
document.addEventListener("DOMContentLoaded", function() {
    // Load the external menu.html file into the #menu-container div
    loadMenu();
    // Function to load the menu
    function loadMenu() {
        fetch("/pages/SiteNavigation.html")
          .then(response => response.text())
          .then(data => {
            document.getElementById("nav-container").innerHTML = data;
    
            // After loading the menu, bind click events to each menu item
            const menuLinks = document.querySelectorAll('#menu a');
            menuLinks.forEach(link => {
              link.addEventListener('click', function(event) {
                event.preventDefault();
    
                // Get the href attribute (the link to the external HTML file)
                const page = this.getAttribute('href');
    
                // Load the external HTML file into the #content div
                loadContent(page);
                });
            });
        });
    }
});

//LOAD CONTENT - Function to load external content into the #content div
function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            //using an if statement here is the most efficient way to call load functions without having to worry about conflicting onload calls in the html file. This keeps the continuity of "Home.html" being the file that's loaded in the browser and all other pages as hrefs in the navigation menu.
            if (page === 'pages/Pokemon.html'){
                loadPokemonData();
            }

            if (page === 'pages/MTG.html'){
                loadMTGData();
            }
        })

        
        .catch(error => {
        document.getElementById("content").innerHTML = "<h2>Error loading content.</h2><p>Sorry, the content could not be loaded.</p>";
        console.error('Error loading the page:', error);
        });
}

//REGISTRATION FORM SUBMISSION
function submitForm(){

    //DECLARE LOCAL VARIABLES - form field values for encoding
    var username = document.forms["registrationForm"]["username"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var phone = document.forms["registrationForm"]["phone"].value;
    var queryString;

    //CALL validateForm
    if (validateForm(document.forms["registrationForm"])){

        //ENCODE DATA - this is what shows up in the URL
        //? indicates start of string
        //encoding values are "=" and "&"
        queryString = `?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;

        //NAVIGATES TO RegistrationSubmit.html and PASSES queryString TO RegistrationSubmit.html 
        //RegistrationSubmit.html WILL CALL getQueryParams FUNCTION
        //Use this to pass values from one page to another

        window.location.href = "pages/RegistrationSubmit.html" + queryString;
    }

        //PREVENT FORM FROM SUBMITTING IF INPUT NOT VALID
        return false;

}//end submitForm

//RETREIVE FORM DETAILS AND DECODE
function getQueryParams() {
    var params = {}; //final array of decoded substrings
    var queryString; //passed from submitForm()
    var pairs; //substring split at "&"
    var pair; //substring split at "="
    var i;

    //window.location.search FINDS URL AND ASSIGNS queryString WITH ENCODED VALUES THAT WERE PASSED (as substring at location 1)
    queryString = window.location.search.substring(1);

    //SPLIT STRING at "&" (first split for decoding)
    pairs = queryString.split("&");

    //FOR LOOP navigates the rest of the queryString array and splits again at "="
    for (i = 0; i < pairs.length; i++) {
        pair = pairs[i].split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return params;
}//end getQueryParams

//DISPLAY FORM RESULTS 
//ONLOAD FUNCTION - supercedes all other javaScript
//The "onload" call is embedded in the HTML 

function displayFormResults() {
        
    //DECLARE LOCAL VARIABLE
    var params = getQueryParams();

    //DISPLAY decoded params
    document.getElementById("displayUsername").innerText = params["username"];
    document.getElementById("displayEmail").innerText = params["email"];
    document.getElementById("displayPhone").innerText = params["phone"];
}



// LOAD POKEMON CARD DATA from a text file
//this is called in the loadContent() function - most efficient way to avoid conflicting "onload" calls in the html. Will likely use this for all content. See loadContent() for additional notes.
function loadPokemonData() {
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
                <button class="add-to-cart">Add to Cart</button>
                <br>
                <br>
            </div>
        `;
    });

    //FILL CONTAINER with innerHTML 
    document.getElementById('productContainer').innerHTML = productHtml;
})
.catch(error => console.error('Error loading product data:', error));
}


// LOAD MAGIC CARD DATA from a text file
//this is called in the loadContent() function. See above for thorough documentation - this is effectively a copy of the loadPokemonData() function
function loadMTGData() {
    fetch('textfiles/magiccards.txt')
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
                <button class="add-to-cart">Add to Cart</button>
                <br>
                <br>
            </div>
        `;
    });

    //FILL CONTAINER with innerHTML 
    document.getElementById('productContainer').innerHTML = productHtml;
})
.catch(error => console.error('Error loading product data:', error));
}

//RANDOM POKEMON 

const displayPokemon = (name, sprite, species, types, abilities, weight, height, stats, moves, description) => {
    document.getElementById('pokemon-name').textContent = name;
    document.getElementById('pokemon-sprite').src = sprite;
    document.getElementById('pokemon-species').textContent = species;
    document.getElementById('pokemon-types').textContent = types.join(', ');
    document.getElementById('pokemon-abilities').textContent = abilities.join(', ');
    document.getElementById('pokemon-weight').textContent = `${weight} kg`;
    document.getElementById('pokemon-height').textContent = `${height} m`;
    document.getElementById('pokemon-stats').textContent = stats.map(stat => `${stat.name}: ${stat.value}`).join(', ');
    document.getElementById('pokemon-moves').textContent = moves.join(', ');
    document.getElementById('pokemon-description').textContent = description;
};

const fetchPokemon = async (pokemonId) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();

        const name = data.name;
        const sprite = data.sprites.front_default;
        const species = data.species.name;
        const types = data.types.map(typeInfo => typeInfo.type.name);
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name);
        const weight = (data.weight / 10).toFixed(1);
        const height = (data.height / 10).toFixed(1);
        const stats = data.stats.map(statInfo => ({
            name: statInfo.stat.name,
            value: statInfo.base_stat
        }));
        const moves = data.moves.slice(0, 5).map(moveInfo => moveInfo.move.name);

        // Fetch species data for Pokédex-like description
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const descriptionEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );
        const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.";

        displayPokemon(name, sprite, species, types, abilities, weight, height, stats, moves, description);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
};

const getRandomPokemon = () => {
    console.log("getting a random pokemon...")
    const maxPokemonId = 1010;
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
    fetchPokemon(randomId);
};


document.addEventListener("DOMContentLoaded", function() {
    getRandomPokemon();
});



// Call getRandomPokemon to display a random Pokémon
//getRandomPokemon();

