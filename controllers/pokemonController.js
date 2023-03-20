const axios = require("axios");

const getPokemon = (req, res) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ success: true, ...response.data });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
};
const getPokemonSpecies = (req, res) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.id}`)
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ success: true, ...response.data });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error.message });
    });
};

module.exports = { getPokemon, getPokemonSpecies };
