const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllPlayers(){
  const rows = await db.query(
    `SELECT name, elo, wins, losses, role, offrole 
    FROM players
    ORDER BY name ASC`
  );
  const data = helper.emptyOrRows(rows);

  return {data}
}

async function getTopPlayers(){
  const rows = await db.query(
    `SELECT name, elo, wins, losses, role, offrole 
    FROM players
    ORDER BY elo DESC`
  );
  const data = helper.emptyOrRows(rows);

  return {data}
}

async function getPlayer(name){
  const rows = await db.query(
    `SELECT name, elo, wins, losses, role, offrole
    FROM players
    WHERE name='${name}'`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function addPlayer(player){
  const result = await db.query(
    `INSERT INTO players 
    (name, role, offrole) 
    VALUES 
    ('${player.name}', '${player.role}', '${player.offrole}')`
  );

  let message = 'Error in creating player';

  if (result.affectedRows) {
    message = 'Player added successfully';
  }

  return {message};
}

async function updatePlayerRecord(name, player){
  const result = await db.query(
    `UPDATE players 
    SET elo=${player.elo}, wins=${player.wins}, losses=${player.losses} 
    WHERE name='${name}'` 
  );

  let message = 'Error in updating player record';

  if (result.affectedRows) {
    message = 'Player record updated successfully';
  }

  return {message};
}

module.exports = {
  getAllPlayers,
  getTopPlayers,
  getPlayer,
  addPlayer,
  updatePlayerRecord
}