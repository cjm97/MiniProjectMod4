const pokemonCry = (file) => {
  new Audio(file).play();
};

function addCards(pokemon, number) {
  const template = document
    .getElementById("pokemon-card-template")
    .content.cloneNode(true);
  template.querySelector(".pokemon-name").innerText = '#' + number + ' ' + pokemon.species.name.slice(0,1).toUpperCase() + pokemon.species.name.slice(1);
  template.querySelector(".pokemon-sprite").src = pokemon["sprites"]["other"]["official-artwork"]["front_default"]
  template.querySelector(".pokemon-description").classList.add(pokemon.species.name);
  template.querySelector(".btn-primary").classList.add(pokemon.species.name + '-audio')
  const playAudio = () => {
    new Audio(`audio/cries/${number}.ogg`).play();
  }
  // template.querySelector(`${pokemon.species.name}-audio`).play
  template.querySelector(`.${pokemon.species.name}-audio`).addEventListener("click", playAudio);
  document.querySelector("#pokemon-list").appendChild(template);
}

const appendDescription = (description) => {
document.querySelector(`.${description.name}`).innerText = description["flavor_text_entries"]["2"]["flavor_text"].replace('\u000c', '');
}

//https://pokeapi.co/api/v2/pokemon/1/ pokemon name/image
for (let i=1; i<152; i++){
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((response) => response.json())
    .then((json) => addCards(json, `${i}`));
}

//https://pokeapi.co/api/v2/pokemon-species/1 flavour text
for (let i=1; i<152; i++){
fetch (`https://pokeapi.co/api/v2/pokemon-species/${i}`)
  .then ((response) => response.json())
  .then((json) => appendDescription(json));
}

for (let i=1; i<152; i++){

}

