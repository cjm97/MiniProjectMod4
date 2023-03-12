const pokemonCry = (file) => {
  new Audio(file).play();
};

function addCards(pokemon, number) {
  const template = document
    .getElementById("pokemon-card-template")
    .content.cloneNode(true);
  template.querySelector(".pokemon-name").innerText =
    "#" +
    number +
    " " +
    pokemon.species.name.slice(0, 1).toUpperCase() +
    pokemon.species.name.slice(1);
  template.querySelector(".pokemon-sprite").src =
    pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  template
    .querySelector(".pokemon-description")
    .classList.add(pokemon.species.name);
  template
    .querySelector(".btn-primary")
    .classList.add(pokemon.species.name + "-audio");
  template.querySelector(".pokemon-type-1").innerText =
    pokemon["types"]["0"]["type"]["name"].slice(0, 1).toUpperCase() +
    pokemon["types"]["0"]["type"]["name"].slice(1);
    template
    .querySelector(".pokemon-type-1")
    .classList.add(pokemon["types"]["0"]["type"]["name"]);

  if (pokemon.types.length > 1) {
    template.querySelector(".pokemon-type-2").innerText =
    pokemon["types"]["1"]["type"]["name"].slice(0, 1).toUpperCase() +
    pokemon["types"]["1"]["type"]["name"].slice(1);
    template
    .querySelector(".pokemon-type-2")
    .classList.add(pokemon["types"]["1"]["type"]["name"]);
  } else {
    template.querySelector(".pokemon-type-2").innerText ='';
  }
  // if (pokemon["types"]["1"]["type"]["name"] === undefined || pokemon["types"]["1"]["type"]["name"] === null) {
  //   template.querySelector(".pokemon-type-2").innerText = "";
  // } else {
    // template.querySelector(".pokemon-type-2").innerText =
    //   pokemon["types"]["1"]["type"]["name"].slice(0, 1).toUpperCase() +
    //   pokemon["types"]["1"]["type"]["name"].slice(1);
  // }

  const playAudio = () => {
    new Audio(`audio/cries/${number}.ogg`).play();
  };
  // template.querySelector(`${pokemon.species.name}-audio`).play
  template
    .querySelector(`.${pokemon.species.name}-audio`)
    .addEventListener("click", playAudio);
  document.querySelector("#pokemon-list").appendChild(template);
}

const appendDescription = (description) => {
  document.querySelector(`.${description.name}`).innerText = description[
    "flavor_text_entries"
  ]["2"]["flavor_text"].replace("\u000c", " ");
};

//https://pokeapi.co/api/v2/pokemon/1/ pokemon name/image
for (let i = 1; i < 152; i++) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((response) => response.json())
    .then((json) => addCards(json, `${i}`));
}

//https://pokeapi.co/api/v2/pokemon-species/1 flavour text
for (let i = 1; i < 152; i++) {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
    .then((response) => response.json())
    .then((json) => appendDescription(json));
}

