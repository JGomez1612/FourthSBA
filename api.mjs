export async function fetchAllPokemon() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(error)
    }
};

export async function fetchPokemonByName(name) {
    try {
        const resPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!resPoke.ok) throw new Error(`Pokemon ${name} not found`);
        const pokeData = await resPoke.json();
   
        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
        const speciesData = await resSpecies.json();

        // console.log(pokeData);
        // console.log(speciesData);

        const combinedData = {...pokeData, species: speciesData};

        // console.log(combinedData);
        return combinedData;
    } catch (error) {
        console.error(error);
    }
}