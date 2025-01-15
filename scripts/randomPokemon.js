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

/*
document.addEventListener("DOMContentLoaded", function() {
    getRandomPokemon();
});
*/


// Call getRandomPokemon to display a random Pokémon
//getRandomPokemon();