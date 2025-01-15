async function fetchRandomCardArt() {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random');
      const cardData = await response.json();
  
      // Check if the card has image_uris and art_crop
      if (cardData.image_uris && cardData.image_uris.art_crop) {
        const artImageUrl = cardData.image_uris.art_crop;
  
        // Create a carousel item dynamically
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
  
        const imgElement = document.createElement('img');
        imgElement.src = artImageUrl;
        imgElement.className = 'd-block w-100';
        imgElement.alt = cardData.name; // Optional alt text
  
        carouselItem.appendChild(imgElement);
  
        // Add to carousel
        const carouselInner = document.getElementById('carousel-images');
        if (carouselInner.children.length === 0) {
          carouselItem.classList.add('active'); // First slide should be active
        }
        carouselInner.appendChild(carouselItem);
      } else {
        console.warn('Card does not have art_crop: ', cardData.name);
        // Retry fetching a card with art
        fetchRandomCardArt();
      }
    } catch (error) {
      console.error('Error fetching card art:', error);
    }
  }
  
  // Fetch multiple card arts to populate the slideshow
  for (let i = 0; i < 10; i++) {
    fetchRandomCardArt();
  }
  