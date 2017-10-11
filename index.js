const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const http = require('http');
const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',     // mysql database host name
  user: 'root',          // mysql database user name
  password: 'password',  // mysql database password
  database: 'test'       // mysql database name
});

connection.connect(err => {
  if (err) throw err;
  console.log('You are now connected with mysql database...');
})

// body-parser configuration
app.use(bodyParser.json());                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Create server
const server = app.listen(3000, "127.0.0.1", () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://${host}:${port}");
});

// Endpoint to get all customers
app.get('/customer', (req, res) => {
  connection.query('select * from customer', (error, results, fields) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

// Endpoint to get a single customer
app.get('/customer/:id', (req, res) => {
  connection.query('SELECT * FROM customer WHERE Id = ?', [req.params.id], (error, results, fields) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

// Endpoint to create a new customer
app.post('/customer', (req, res) => {
  const params = req.body;

  connection.query('INSERT INTO customer SET ?', params, (error, results, fields) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

// Endpoint to update a customer
app.put('/customer', (req, res) => {
  connection.query('UPDATE customer SET Name = ?, Address = ?, Country = ?, Phone = ? WHERE Id = ?', [req.body.Name, req.body.Address, req.body.Country, req.body.Phone, req.body.Id], (error, results, fields) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

// Endpoint to delete a customer
app.delete('/customer', (req, res) => {
  connection.query('DELETE FROM customer WHERE Id = ?', [req.body.Id], (error, results, fields) => {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
});