const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllPlayers(id){
  const rows = await db.query(
    `SELECT teams.team_name, teams.id, players.name, elo, players.wins, players.losses, role
    FROM roster
    JOIN players ON roster.player=players.name
    JOIN teams on roster.team=teams.id
    WHERE roster.team=${id}
    GROUP BY roster.player`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getAllPlayersForGame(team, game){
  const rows = await db.query(
    `SELECT teams.team_name, players.name, elo, role
    FROM roster
    JOIN game_participants on roster.player=game_participants.player AND game_participants.game=${game}
    JOIN players ON game_participants.player=players.name
    JOIN teams on roster.team=teams.id
    WHERE roster.team=${team}`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getPlayerTeams(name){
  const rows = await db.query(
    `SELECT * 
    FROM teams
    WHERE id IN (
    SELECT team
    FROM roster
    WHERE player='${name}'
    )`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function rosterPlayer(player, team){
  const result = await db.query(
    `INSERT INTO roster 
    (player, team) 
    VALUES 
    ('${player}', ${team})`
  );

  let message = 'Error in rostering player';

  if (result.affectedRows) {
    message = 'Player rostered successfully';
  }

  return {message};
}

module.exports = {
  getAllPlayers,
  getAllPlayersForGame,
  getPlayerTeams,
  rosterPlayer,
}