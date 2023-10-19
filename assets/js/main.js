
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailConteiner = document.getElementById('detailsConteiner')
let pokemonClicked;

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <a class="hyperlink" onclick="pokemonClicked = '${pokemon.name}';  showPokemonDetails(pokemonClicked)" >
                <span class="number">#${pokemon.number}</span>
                <span id="${pokemon.number}" class="name">
                    ${pokemon.name}
                </span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `
}

function convertPokemonToPopUp(pokemonDetails) {
    return `
    <header class="header ${pokemonDetails.types[0]}">
    <a onclick="hidePokemonDetails()" class="backButton">
        <p>Back</p>
    </a>
    </header>
    <section id="content">
        <section class="pokemon_details ${pokemonDetails.types[0]}">
            <div class="details_details">
                <span class="name_details">${pokemonDetails.name}</span>
                <ol class="types_details" >
                    ${pokemonDetails.types.map((type) => `<li class="type_details ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <span class="number_details">#${pokemonDetails.number}</span>
        </section>
        <section class="image-container_details ${pokemonDetails.types[0]}">
            <img src="${pokemonDetails.photo}" alt="${pokemonDetails.name}" class="image_details">
        </section>
        <section class="info_details">
            <span class="divider_details">About</span>
            <div class="about-section_details">
                <ol class="characteristics_details">
                    <li class="char-name_details">Species</li>
                    <li class="char-name_details">Height</li>
                    <li class="char-name_details">Weight</li>
                    <li class="char-name_details">Abilities</li>
                </ol>
                <ol class="characteristics_details">
                    <li class="char_details">${pokemonDetails.species}</li>
                    <li class="char_details">${pokemonDetails.height}</li>
                    <li class="char_details">${pokemonDetails.weight}</li>
                    <li class="char_details">${pokemonDetails.abilities}</li>
                </ol>
            </div>
        </section>
    </section>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function showPokemonDetails (pokemonClicked) {
    pokeApi.getPokemonInfo(pokemonClicked).then((pokemonDetails) => {
        const newHtml = convertPokemonToPopUp(pokemonDetails)
        detailConteiner.innerHTML = newHtml
    })
}

function hidePokemonDetails (){
    detailConteiner.innerHTML = "";
}