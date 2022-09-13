const express = require('express');
const router = express.Router();
const players = require('../services/players');
const roster = require('../services/roster');
const games = require('../services/games');

/* GET all players. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await players.getAllPlayers());
  } catch (err) {
    console.error(`Error while getting players`, err.message);
    next(err);
  }
});

/* GET top players. */
router.get('/top', async function(req, res, next) {
  try {
    res.json(await players.getTopPlayers(req.query.page));
  } catch (err) {
    console.error(`Error while getting top players`, err.message);
    next(err);
  }
});

/* GET single player */
router.get('/:name', async function(req, res, next) {
  try {
    res.json(await players.getPlayer(req.params.name));
  } catch (err) {
    console.error(`Error while getting player`, err.message);
    next(err);
  }
});

/* GET teams a single player played on*/
router.get('/:name/teams', async function(req, res, next) {
  try {
    res.json(await roster.getPlayerTeams(req.params.name));
  } catch (err) {
    console.error(`Error while getting player teams`, err.message);
    next(err);
  }
});

/* GET games a single player played in*/
router.get('/:name/games', async function(req, res, next) {
  try {
    res.json(await games.getAllPlayersGames(req.params.name));
  } catch (err) {
    console.error(`Error while getting player games`, err.message);
    next(err);
  }
});

// Will move to admin server
/* POST add new player */
router.post('/', async function(req, res, next) {
  try {
    res.json(await players.addPlayer(req.body));
  } catch (err) {
    console.error(`Error while adding player`, err.message);
    next(err);
  }
});

/* POST roster a player to a team*/
router.post('/:player/:team', async function(req, res, next) {
  try {
    res.json(await roster.rosterPlayer(req.params.player, req.params.team));
  } catch (err) {
    console.error(`Error while rostering player`, err.message);
    next(err);
  }
});

/* PUT update player record */
router.put('/:name', async function(req, res, next) {
  try {
    res.json(await players.updatePlayerRecord(req.params.name, req.body));
  } catch (err) {
    console.error(`Error while updating player record`, err.message);
    next(err);
  }
});

module.exports = router;