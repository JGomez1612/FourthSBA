import { fetchAllPokemon, fetchPokemonByName } from "../api.mjs";
import { displayPokemon } from "../display.mjs";

(async function initialLoad() {
    try {
        const allPokemon = await fetchAllPokemon();

        console.log(allPokemon);
    } catch (error) {
        console.error(error)
    }
})();

const search = document.getElementById('search');
const input = document.getElementById('searchInput');

search.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pokeName = input.value;
    if(!pokeName) return;

    const pokeData = await fetchPokemonByName(pokeName);
    console.log(pokeData);
    displayPokemon(pokeData);

    input.value = '';
});
