const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllTeams(eventId){
  const rows = await db.query(
    `SELECT *
    FROM teams
    WHERE event=${eventId}
    ORDER BY score DESC`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function getTeam(id){
  const rows = await db.query(
    `SELECT id, captain, event, team_name
    FROM teams
    WHERE id=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function addTeam(team){
  const result = await db.query(
    `INSERT INTO teams 
    (captain, event) 
    VALUES 
    ('${team.captain}', ${team.event})`
  );

  let message = 'Error in creating team';

  if (result.affectedRows) {
    message = 'Team added successfully';
  }

  return {message};
}

async function updateTeamRecord(id, team){
  const result = await db.query(
    `UPDATE teams 
    SET score=${team.score}, wins=${team.wins}, losses=${team.losses} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating team record';

  if (result.affectedRows) {
    message = 'Team record updated successfully';
  }

  return {message};
}

module.exports = {
  getAllTeams,
  getTeam,
  addTeam,
  updateTeamRecord
}