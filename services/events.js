const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllEvents(){
  const rows = await db.query(
    `SELECT id, name, date
    FROM events
    ORDER BY date DESC`
  );
  const data = helper.emptyOrRows(rows);

  return {data}
}

async function getEvent(id){
  const rows = await db.query(
    `SELECT id, name, date
    FROM events
    WHERE id=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {data}
}

async function addEvent(event){
  const result = await db.query(
    `INSERT INTO events 
    (name) 
    VALUES 
    ('${event.name}')`
  );

  let message = 'Error in creating event';

  if (result.affectedRows) {
    message = 'Event added successfully';
  }

  return {message};
}

module.exports = {
  getAllEvents,
  getEvent,
  addEvent,
}