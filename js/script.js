const app = document.getElementById("app");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchBtn = document.getElementById("searchBtn");

const urlBase = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
let next;
let previous;

const fetchPokemon = async (url) => {
    if (url == null) {
        url = urlBase;
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("La solicitud no se ha podido completar")

        }
        const pokemons = await response.json()
        searchPokemon(pokemons);
    } catch (error) {
        console.error('Error en la solicitud', error)

    }
}

const searchPokemon = (pokemons) => {
    next = pokemons.next;
    previous = pokemons.previous;
    app.innerHTML = '';
    pokemons.results.forEach(pokemon => {
        displayPokemon(pokemon.url, false)
    })
}

const displayPokemon = async (url, tipo) => {

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("La solicitud no se ha podido completar")

        }
        const pokemonData = await response.json()

        tipo ? printpage2(pokemonData) : printpage(pokemonData);

        console.log(pokemonData);
    } catch (error) {
        console.error('Error en la solicitud', error)
        app.innerHTML = 'El pokemon no ha sido encontrado';

    }
}

const printpage = (pokemon) => {

    const { name, sprites, height, weight, id } = pokemon;
    const template = `
        <div class="pokecard" value=${id}>
            <img src="${sprites.other.dream_world.front_default}" alt="${name}"/>
            <div>
            <h2>${name}</h2>
        </div>
    `;
    app.innerHTML += template;
}

const printpage2 = (pokemon) => {

    const { name, sprites, height, weight, id } = pokemon;
    let array = [];
    pokemon.types.forEach(poke => {
        array.push(poke.type.name)
    });
    console.log(array);
    const template = `
        <div class="pokecard" value=${id}>
            <img src="${sprites.other.dream_world.front_default}" alt="${name}"/>
            <div>
            <h2>${name}</h2>
            <p>Peso: ${weight}</p>
            <p>Altura: ${height}</p>
            <p>Tipos: ${array.join(', ')}</div>
        </div>
    `;
    app.innerHTML += template;
}

searchBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${searchInput}`
    app.innerHTML = '';
    displayPokemon(url, true)

})

fetchPokemon(urlBase);

nextBtn.addEventListener("click", () => {

    fetchPokemon(next)
})

prevBtn.addEventListener("click", () => {
    fetchPokemon(previous)
})



