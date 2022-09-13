const express = require('express');
const router = express.Router();
const teams = require('../services/teams');
const roster = require('../services/roster');
const games = require('../services/games');
const gameParticipants = require('../services/game_participants');

/* GET single team */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await teams.getTeam(req.params.id));
  } catch (err) {
    console.error(`Error while getting team`, err.message);
    next(err);
  }
});

/* GET single teams players */
router.get('/:id/players', async function(req, res, next) {
  try {
    res.json(await roster.getAllPlayers(req.params.id));
  } catch (err) {
    console.error(`Error while getting players for team`, err.message);
    next(err);
  }
});

/* GET single teams players that played in a specific game*/
router.get('/:team/players/:game', async function(req, res, next) {
  try {
    res.json(await roster.getAllPlayersForGame(req.params.team, req.params.game));
  } catch (err) {
    console.error(`Error while getting players for game`, err.message);
    next(err);
  }
});


/* GET single teams empire games */
router.get('/:id/empire', async function(req, res, next) {
  try {
    res.json(await games.getEmpireGames(req.params.id));
  } catch (err) {
    console.error(`Error while getting empire games for team`, err.message);
    next(err);
  }
});

/* GET single teams nr games */
router.get('/:id/nr', async function(req, res, next) {
  try {
    res.json(await games.getNrGames(req.params.id));
  } catch (err) {
    console.error(`Error while getting nr games for team`, err.message);
    next(err);
  }
});

/* GET all of a single teams games */
router.get('/:id/games', async function(req, res, next) {
  try {
    res.json(await games.getAllTeamsGames(req.params.id));
  } catch (err) {
    console.error(`Error while getting games for team`, err.message);
    next(err);
  }
});

/* GET all of a single teams games a player player*/
router.get('/:id/games/:name', async function(req, res, next) {
  try {
    res.json(await games.getAllPlayersGamesForTeam(req.params.id, req.params.name));
  } catch (err) {
    console.error(`Error while getting games for team played by player`, err.message);
    next(err);
  }
});

// Will move to admin server
/* POST add new team */
router.post('/', async function(req, res, next) {
  try {
    res.json(await teams.addTeam(req.body));
  } catch (err) {
    console.error(`Error while adding team`, err.message);
    next(err);
  }
});

/* POST add player to a game */
router.post('/:team/games/:game', async function(req, res, next) {
  try {
    res.json(await gameParticipants.addGameParticipant(req.params.team, req.params.game, req.body));
  } catch (err) {
    console.error(`Error while adding player to game`, err.message);
    next(err);
  }
});

/* PUT update single team */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await teams.updateTeamRecord(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating team`, err.message);
    next(err);
  }
});

module.exports = router;