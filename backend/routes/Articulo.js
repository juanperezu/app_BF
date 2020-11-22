
//const mysql = require('mysql');

let instance = null;

const  mysqlConnection = require('../db/db');


class Articulo {
    static getDbServiceInstance() {
        return instance ? instance : new Articulo();
    }
    // Traer todos
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM articulos;";
                mysqlConnection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

  // INsertar un nuevo
    async insertNewArticulo(descripcion,precio) {
        try {
            //const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO articulos (descripcion, precio) VALUES (?,?);";
                mysqlConnection.query(query, [descripcion,precio] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
              codigo : insertId,
               descripcion : descripcion,
               precio:precio,
               fecha_ingreso:fecha_ingreso
            
               
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM articulos WHERE codigo = ?";
    
                mysqlConnection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, descripcion,precio) {
        console.log("id :"  +id +  " Desc : "+ descripcion+ " Precion :" +precio)
        try {
         id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE articulos SET descripcion = ?,precio=? WHERE codigo = ?";
    
                mysqlConnection.query(query, [descripcion,precio,id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                    //res.json(rows[0]);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(codigo) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM articulos WHERE codigo = ?;";

                mysqlConnection.query(query, [codigo], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Articulo;