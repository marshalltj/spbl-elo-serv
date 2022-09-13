const express = require('express');
const router = express.Router();
const events = require('../services/events');
const games = require('../services/games');
const teams = require('../services/teams');

/* GET all events */
router.get('/', async function(req, res, next) {
  try {
    res.json(await events.getAllEvents(req.query.page));
  } catch (err) {
    console.error(`Error while getting events`, err.message);
    next(err);
  }
});

/* GET all teams for an event */
router.get('/:eventId/teams', async function(req, res, next) {
  try {
    res.json(await teams.getAllTeams(req.params.eventId));
  } catch (err) {
    console.error(`Error while getting teams`, err.message);
    next(err);
  }
});

/* GET single event */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await events.getEvent(req.params.id));
  } catch (err) {
    console.error(`Error while getting event`, err.message);
    next(err);
  }
});

/* GET all games for an event */
router.get('/:id/games', async function(req, res, next) {
  try {
    res.json(await games.getAllEventGames(req.params.id));
  } catch (err) {
    console.error(`Error while getting games for event`, err.message);
    next(err);
  }
});

// Will move to admin server
/* POST add new event */
router.post('/', async function(req, res, next) {
  try {
    res.json(await events.addEvent(req.body));
  } catch (err) {
    console.error(`Error while adding event`, err.message);
    next(err);
  }
});


/* POST add new game to event */
router.post('/:id/games', async function(req, res, next) {
  try {
    res.json(await games.addGame(req.body, req.params.id));
  } catch (err) {
    console.error(`Error while adding games to event`, err.message);
    next(err);
  }
});

/* PUT update game result */
router.put('/games/:gameId', async function(req, res, next) {
  try {
    res.json(await games.updateGameResult(req.params.gameId, req.body));
  } catch (err) {
    console.error(`Error while updating game result`, err.message);
    next(err);
  }
});

module.exports = router;