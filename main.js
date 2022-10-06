function fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then((allpokemon) => {
            allpokemon.results.forEach((pokemon) => fetchPokemonData(pokemon));
        });
}

function fetchPokemonData(pokemon) {
    const url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then((pokeData) => renderPokemonCard(pokeData));
}

function renderPokemonCard(pokeData) {

    const template = `<li class="card">
        <h2 class="card-name">${pokeData.name}</h2>
        <p>#${pokeData.id}</p>
        <img class="card-image" src="${pokeData.sprites.other.home.front_default}" />
        <ul>
            ${renderTypes(pokeData.types)}
        </ul>
    </li>`;

    const pokedex = document.querySelector('.lista');
    pokedex.insertAdjacentHTML("beforeend", template);
}

function renderTypes(types) {
    let template = '';

    types.forEach(function(type) {
        template += `<li>${type.type.name}</li>`;
    });

    return template;
}

fetchPokemons();