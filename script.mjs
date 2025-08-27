

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
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!res.ok) {
            throw new Error(`Pokemon ${name} not found`);
        }
        const data = await res.json();
        displayPokemon(data);

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

    const typing = document.createElement('p');
    if (pokemon.types.length === 1) {
        typing.textContent = `Type: ` + pokemon.types[0].type.name;
    } else {
        typing.textContent = `Types: ` + pokemon.types[0].type.name + '|' + pokemon.types[1].type.name;
    }

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name

    display.append(name, typing, img);
}
