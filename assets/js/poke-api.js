
const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function addBasicDetails(pokeDetail) {
    const pokemonDetails = new Pokemon()
    pokemonDetails.number = pokeDetail.id;
    pokemonDetails.name = pokeDetail.name;
    pokemonDetails.type = pokeDetail.types.map((typeSlot) => typeSlot.type.name)[0];
    pokemonDetails.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemonDetails.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemonDetails.species = pokeDetail.species.name;
    pokemonDetails.height = pokeDetail.height;
    pokemonDetails.weight = pokeDetail.weight;
    pokemonDetails.abilities = pokeDetail.abilities.map((index) => `${index.ability.name}`).join(', ')
    return pokemonDetails
   
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonInfo = (pokemonClicked) => {
    const urlBasics = `https://pokeapi.co/api/v2/pokemon/${pokemonClicked}`

    return fetch(urlBasics)
        .then((response) => response.json())
        .then(addBasicDetails)    
}