const mysql = require('mysql2')
// const dbConfig=require("../dbconfig/db.config");

//create connection to the database
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Solution@2023',
    database:'HRMS',
});

connection.connect((error) => {
    if(error) throw error;
    console.log('Successfully connected to database')
})

module.exports = connection;