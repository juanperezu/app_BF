const express = require('express');
const app = express();
const cors = require('cors');
//const dotenv = require('dotenv');
//dotenv.config();

const dbService = require('./routes/Service');
const dbArticulo = require('./routes/Articulo'); // import dbArticulo

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
// articulos NUEVO
app.get('/getTodos', (request, response) => {
    const db = dbArticulo.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
// Nuevo articulo
app.post('/nuevo-articulo', (request, response) => {
    const { precio } = request.body;
    const { descripcion } = request.body;
    const db =dbArticulo.getDbServiceInstance();
    
    const result = db.insertNewArticulo(descripcion,precio);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// Actualizar producto
app.patch('/actualizar_articulo', (request, response) => {
    const { codigo, descripcion, precio } = request.body;

    console.log('recibiendo codigo:  '+codigo)
    const db = dbArticulo.getDbServiceInstance();

    const result = db.updateNameById(codigo, descripcion,precio);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/buscar/:codigo', (request, response) => {
    const { codigo } = request.params;
    const db = dbArticulo.getDbServiceInstance();

    const result = db.searchByName(codigo);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})


app.listen(process.env.PORT, () => console.log('Servidor corriendo en '+process.env.PORT));