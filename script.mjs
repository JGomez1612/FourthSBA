async function fetchData(){
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/meowscarada");

        if(!res.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await res.json();
        console.log(data);

    } catch (error) {
       console.error(error); 
    }  
}

fetchData();