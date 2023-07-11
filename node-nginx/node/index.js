const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

app.get('/', (req, res) => {
  insertPeople(res);
});

app.listen(PORT, () => {
  console.log('STARTED AT ' + PORT);
});

async function getPersonName() {
  const response = await axios.get('https://swapi.dev/api/people');
  return response.data.results[Math.floor(Math.random() * 10)].name;
}

async function insertPeople(res) {
  const name = await getPersonName();
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('${name}')`;
    
  connection.query(sql);
  getPeople(res, connection);
}

function getPeople(res, connection) {    
  const sql = `SELECT id, name FROM people`;  
  
  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error
    };
    
    let table = '<table>';
    table += '<tr><th>#</th><th>Name</th></tr>';
    for(let people of results) {      
      table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
    }

    table += '</table>';    
    res.send('<h1>Full Cycle Rocks!</h1>' + table);    
  });   
  connection.end();
}