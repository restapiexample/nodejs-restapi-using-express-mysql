const http = require('http');
const express = require('express');
let app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

connection.connect((err) => {
    if (err) throw err(
        console.log("You have an error in connection"));
    else {
        console.log("No error")

    }
});

app.use(bodyParser.json());
app.use((bodyParser.urlencoded)({
    extended: true
}));


const server = app.listen(3000, "127.0.0.1", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("App listening to", host, port)
});


// rest api to get all customers
app.get('/customer', (req, res) => {
    connection.query('select * from customer', (error, results, fields) => {
        if (error) throw error;
        res.send(JSON.stringify(results))
    })
});


//rest api to get a single customer data
app.get('/customer/:id', (req, res) => {
    connection.query('select * from customer where Id=?', [req.params.id], (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));

    })
});

//rest api to create a new customer record into mysql database
app.post('/customer', (req, res) => {
    let params = req.body;
    console.log(params);
    connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to update record into mysql database
app.put('/customer', (req, res) => {
    connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name, req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
app.delete('/customer', (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], (error, results, fields) => {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});