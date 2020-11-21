<<<<<<< HEAD
const mysql = require('mysql');

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
    async insertNewName(descripcion,precio) {
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
                id : insertId,
               descripcion : descripcion,
               precio:precio
            
               
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
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE articulos SET descripcion = ?,precio=? WHERE codigo = ?";
    
                mysqlConnection.query(query, [descripcion,precio, id] , (err, result) => {
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

    async searchByName(descripcion) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM articulos WHERE descripcion = ?;";

                mysqlConnection.query(query, [descripcion], (err, results) => {
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

=======
const mysql = require('mysql');

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
    async insertNewName(descripcion,precio) {
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
                id : insertId,
               descripcion : descripcion,
               precio:precio
            
               
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
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE articulos SET descripcion = ?,precio=? WHERE codigo = ?";
    
                mysqlConnection.query(query, [descripcion,precio, id] , (err, result) => {
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

    async searchByName(descripcion) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM articulos WHERE descripcion = ?;";

                mysqlConnection.query(query, [descripcion], (err, results) => {
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

>>>>>>> 2a7091193750470d48c16b3aafd4697fd69646f3
module.exports = Articulo;