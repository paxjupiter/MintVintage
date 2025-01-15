//LOAD site navigation and call content loader
document.addEventListener("DOMContentLoaded", function() {
    loadMenu();
    console.log("loadMenu() called")

    //loadContent('pages/Home.html');

    function loadMenu() {
        fetch("./pages/SiteNavigation.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-container").innerHTML = data;
            
            const menuLinks = document.querySelectorAll('#menu a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    if (this.href.includes('facebook.com') || this.href.includes('instagram.com')) {
                        return; 
                    }
                    
                    // Check if the clicked link is for RegistrationSubmit.html
                    if (this.href.includes('RegistrationSubmit.html')) {
                        // Open RegistrationSubmit.html in a new tab
                        window.open(this.href, '_blank');
                        event.preventDefault(); // Prevent the default action of the link (i.e., loading in the same tab)
                        displayFormResults();
                        return;
                    }
                    
                    event.preventDefault();
                    
                    const page = this.getAttribute('href');
                    console.log("nav menu links set.")
                    
                    if(page.includes('index.html'))
                        loadContent('./pages/Home.html');

                        // Load the external HTML file into the #content div
                        loadContent(page);
                        console.log('loadContent() called.')

                        // Update body class based on the active page
                        if (page.includes('Home.html')) {
                            document.body.classList.add('home');
                            console.log(".home classlist added.")
                        } else {
                            document.body.classList.remove('home');
                            console.log(".home classlist removed.")
                        }
                    });
                });
            });
    }
});



//LOAD CONTENT - Function to load external content into the #content div
function loadContent(page) {
    console.log("Content loader called.");

    // Check if the page is already a full path or needs './' prepended
    let fullPath;
    if (page.startsWith('/')) {
        fullPath = page;  // absolute path, do not modify
    } else {
        fullPath = `./${page}`;  // prepend base path for relative paths
    }

    fetch(fullPath)
        .then(response => response.text())
        .then(data => {
            // Update main content area
            document.getElementById("content").innerHTML = data;


            // Re-add the class to the body based on page load
            if (page.includes('Home.html')) {
                document.body.classList.add('home');
                console.log(".home class list added");
                getRandomPokemon();
                fetchRandomCardArt();
                toggleLogo(page);
            } else {
                document.body.classList.remove('home');
                console.log(".home class list removed");
            }

            // Use toggleAside function to manage aside display
            toggleAside(page);
            
            // Additional functions for other pages
            if (page.includes('Pokemon.html')) {
                loadPokemonData();
                console.log("loadPokemonData called.");
            } else if (page.includes('MTG.html')) {
                loadMTGData();
                console.log("loadMagicCardData called.");
            }

            if (page.includes('Register.html')){
                $(document).ready(function() {
                    console.log("Shake registration div called");
                    $("#loginDiv").effect("shake", { times: 3, distance: 5 }, 500);
                });
            }

            if(page.includes('RegistrationSubmit.html')){
                displayFormResults();
                console.log("Display from results called.");   
            }

            if (page.includes('Cart.html')){
                displayCart();
            }
        })
        .catch(error => console.error("Error loading content:", error));
}

// Modified toggleAside function
function toggleAside(page) {
    const mainContainer = document.getElementById("main-container");
    const existingAside = document.getElementById("asideContainer");

    if (page.includes('Home.html')) {
        // If aside doesn’t exist, create and add it
        if (!existingAside) {
            const aside = document.createElement('aside');
            aside.id = "asideContainer";
            aside.className = "asideContainer";
            aside.innerHTML = `
                <h2>WHO'S THAT POKEMON?</h2>
                <div id="pokemon-container">
                    <h3><strong>IT'S.... </strong><span id="pokemon-name"></span><strong>!!</strong></h3>
                    <img id="pokemon-sprite" alt="Pokemon Sprite">
                    <p><strong>Species:</strong> <span id="pokemon-species"></span></p>
                    <p><strong>Types:</strong> <span id="pokemon-types"></span></p>
                    <p><strong>Abilities:</strong> <span id="pokemon-abilities"></span></p>
                    <p><strong>Weight:</strong> <span id="pokemon-weight"></span></p>
                    <p><strong>Height:</strong> <span id="pokemon-height"></span></p>
                    <p><strong>Base Stats:</strong> <span id="pokemon-stats"></span></p>
                    <p><strong>Moves:</strong> <span id="pokemon-moves"></span></p>
                    <p><strong>Description:</strong> <span id="pokemon-description"></span></p>
                </div>
            `;
            mainContainer.appendChild(aside);
        }
    } else {
        // If not on the home page, remove the aside if it exists
        if (existingAside) {
            existingAside.remove();
        }
    }
}

// Modified toggleLogo function
function toggleLogo(page) {
    const header = document.getElementById("header");
    const logo = document.getElementById("logo");

    if (page.includes('Home.html')) {
        // Make sure the logo is visible on the Home page
        if (logo) {
            logo.style.display = "block";  // Show the logo
        }
    } else {
        // Hide the logo on other pages
        if (logo) {
            logo.style.display = "none";  // Hide the logo
        }
    }
}


