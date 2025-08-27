

(async function initialLoad(){
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await res.json();
        // console.log(data);
        console.log(data.results[0]);
    } catch (error) {
        console.error(error)
    }
})();

async function fetchPokemonByName(name){
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if(!res.ok){
            throw new Error(`Pokemon ${name} not found`);
        }
        const data = await res.json();
        console.log(data);

    } catch (error) {
       console.error(error); 
    }  
}

fetchPokemonByName("Meowscarada");