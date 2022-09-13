const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function addGameParticipant(team, game, player){
  const result = await db.query(
    `INSERT INTO game_participants 
    (game, team, player, historical_elo) 
    VALUES 
    ('${game}', ${team}, '${player.name}', ${player.historical_elo})`
  );

  let message = 'Error in adding player to game';

  if (result.affectedRows) {
    message = 'Player added to game successfully';
  }

  return {message};
}

module.exports = {
  addGameParticipant
}