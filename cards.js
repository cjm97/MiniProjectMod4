const pokemonCry = (file) => {
  new Audio(file).play();
};

function addCards(pokemon) {
    const template = document
      .getElementById("pokemon-card-template")
      .content.cloneNode(true);
    template.querySelector(".pokemon-name").innerText = pokemon.title;
    template.querySelector(".pokemon-sprite").src = pokemon.sprites.front_default;
    template.querySelector("#pokemon-list").appendChild(template);
}

// for (let i=1; i<152; i++){
fetch(`https://pokeapi.co/api/v2/pokemon/1`)
  .then((response) => response.json())
  .then((json) => addCards(json));
// }
