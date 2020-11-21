const mysql = require('mysql');
const dotenv = require('dotenv');
//let instance = null;
dotenv.config();

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
  
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err.message);
    }else{
     console.log( "Base de datos conectada ");
    }
    // console.log('db ' + connection.state);
});
module.exports=mysqlConnection;
