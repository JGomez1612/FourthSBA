

(async function initialLoad() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await res.json();
        console.log(data.results);
    } catch (error) {
        console.error(error)
    }
})();

async function fetchPokemonByName(name) {
    try {
        const resPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!resPoke.ok) throw new Error(`Pokemon ${name} not found`);
        const pokeData = await resPoke.json();
   
        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
        const speciesData = await resSpecies.json();

        // console.log(pokeData);
        // console.log(speciesData);

        const combinedData = {...pokeData, species: speciesData};

        console.log(combinedData);
        return combinedData;
    } catch (error) {
        console.error(error);
    }
}

fetchPokemonByName("");

function displayPokemon(pokemon) {
    const display = document.getElementById('display');
    display.innerHTML = '';

    if (!pokemon) {
        display.textContent = 'Pokemon not found!';
        return;
    }

    const name = document.createElement('h2');
    name.textContent = pokemon.name;
    name.classList.add('name')

    const typing = document.createElement('p');
    if (pokemon.types.length === 1) {
        typing.textContent = `Type: ` + pokemon.types[0].type.name;
    } else {
        typing.textContent = `Types: ` + pokemon.types[0].type.name + ' | ' + pokemon.types[1].type.name;
    }
    typing.classList.add('types')

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    img.classList.add('image')

    const desc = document.createElement('p');
    desc.textContent = pokemon.species.flavor_text_entries[0].flavor_text;
    desc.classList.add('description');
// Some descriptions have a weird arrow or come in a different language. Unsure how to resolve at this time.

    display.append(name, typing, img, desc);
}

const search = document.getElementById('search');
const input = document.getElementById('searchInput');

search.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const pokeName = input.value;
    if(!pokeName) return;

    const pokeData = await fetchPokemonByName(pokeName);
    displayPokemon(pokeData);

    input.value = '';
});
