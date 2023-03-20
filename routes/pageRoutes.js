const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
// testing
router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/new", (req, res) => {
  res.send("this is a test");
});

//
router.get("/:id", (req, res) => {
  pokemonController.getPokemon(req, res);
});

router.get("/species/:id", (req, res) => {
  pokemonController.getPokemonSpecies(req, res);
});

module.exports = router;
