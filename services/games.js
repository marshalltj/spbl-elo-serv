const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllEventGames(id){
  const rows = await db.query(
    `SELECT nr_team, emp_team, win_team, map, elo_score, id
    FROM games
    WHERE event=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getAllTeamsGames(id){
  const rows = await db.query(
    `SELECT *
    FROM games
    WHERE nr_team=${id}
    OR emp_team=${id}
    ORDER BY round ASC`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getAllPlayersGamesForTeam(team, name){
  const rows = await db.query(
    `SELECT nr_team, emp_team, win_team, map, elo_score, round, emp_team_elo, nr_team_elo, games.id, teams.team_name, historical_elo
    FROM games 
    JOIN game_participants ON game_participants.game=games.id 
    AND (games.nr_team=${team} or games.emp_team=${team}) 
    AND game_participants.player="${name}"
    JOIN teams on (games.nr_team=teams.id or games.emp_team=teams.id)
    WHERE teams.id != ${team}
    ORDER BY round ASC`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getAllPlayersGames(name){
  const rows = await db.query(
    `SELECT *
    FROM games
    WHERE nr_team OR emp_team IN(
      SELECT team 
      FROM roster
      WHERE player = '${name}'
    )`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getEmpireGames(id){
  const rows = await db.query(
    `SELECT nr_team, emp_team, win_team, event, map, elo_score, id
    FROM games
    WHERE emp_team=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getNrGames(id){
  const rows = await db.query(
    `SELECT nr_team, emp_team, win_team, event, map, elo_score, id
    FROM games
    WHERE nr_team=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function addGame(game, id){
  const result = await db.query(
    `INSERT INTO games 
    (nr_team, emp_team, event) 
    VALUES 
    (${game.nr_team}, ${game.emp_team}, ${id})`
  );

  let message = 'Error in creating game';

  if (result.affectedRows) {
    message = 'Game added successfully';
  }

  return {message};
}

async function updateGameResult(id, game){
  const result = await db.query(
    `UPDATE games 
    SET win_team=${game.win_team}, elo_score=${game.elo_score}, 
    map="${game.map}", round=${game.round}, emp_team_elo=${game.emp_team_elo}, nr_team_elo=${game.nr_team_elo}
    WHERE id='${id}'` 
  );

  let message = 'Error in updating game result';

  if (result.affectedRows) {
    message = 'Game result updated successfully';
  }

  return {message};
}

module.exports = {
  getAllEventGames,
  getAllTeamsGames,
  getAllPlayersGamesForTeam,
  getAllPlayersGames,
  getEmpireGames,
  getNrGames,
  addGame,
  updateGameResult
}