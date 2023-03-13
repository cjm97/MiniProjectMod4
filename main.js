const pokemonCry = (file) => {
  new Audio(file).play();
};

function addCards(pokemon, number) {
  const template = document
    .getElementById("pokemon-card-template")
    .content.cloneNode(true);
  let pokeName =
    pokemon.species.name.slice(0, 1).toUpperCase() +
    pokemon.species.name.slice(1);
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
    template.querySelector(".pokemon-type-2").innerText = "";
  }
  
  template.querySelector(".pokemon-stat").setAttribute("id", `${pokemon.species.name}-stat`);
  //MODAL
  // template.querySelector("#exampleModal")['data-bs-target']="#test"
  // template.querySelector(".modal-button").innerText = `${pokemon.species.name} Stats`
  template.getElementById('modal__button').setAttribute("data-bs-target", `#${pokemon.species.name}-modal`)
  template.querySelector(".modal").setAttribute("id", `${pokemon.species.name}-modal`);
  template.querySelector(".modal-body").classList.add(`${pokemon.species.name}-modal-body`)
  template.querySelector(".modal-body").innerText = "Test"


  const playAudio = () => {
    new Audio(`audio/cries/${number}.ogg`).play();
  };

  // template.querySelector(`${pokemon.species.name}-audio`).play
  template
    .querySelector(`.${pokemon.species.name}-audio`)
    .addEventListener("click", playAudio);
  document.querySelector("#pokemon-list").appendChild(template);
  //chart
let dom = document.getElementById(`${pokemon.species.name}-stat`);

let myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
let app = {};

let option;

option = {
    title: {
      text: pokemon.species.name.slice(0, 1).toUpperCase() +
    pokemon.species.name.slice(1) + ' Stats',
    },
    radar: {
      // shape: 'circle',
      indicator: [
        {
          name: "HP",
          max: 255,
        },
        {
          name: "Attack",
          max: 255,
        },
        {
          name: "Defense",
          max: 255,
        },
        {
          name: "Special-Attack",
          max: 255,
        },
        {
          name: "Special-Defense",
          max: 255,
        },
        {
          name: "Speed",
          max: 255,
        },
      ],
    },
    series: [
      {
        name: "Stats",
        type: "radar",
        data: [
          {
            value: [
              pokemon["stats"]["0"]["base_stat"],
              pokemon["stats"]["1"]["base_stat"],
              pokemon["stats"]["2"]["base_stat"],
              pokemon["stats"]["3"]["base_stat"],
              pokemon["stats"]["4"]["base_stat"],
              pokemon["stats"]["5"]["base_stat"],
            ],
          },
        ],
      },
    ],
  };

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
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

// CHART
