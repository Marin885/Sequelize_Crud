const express = require('express');
const controladoresLibros = require('../controllers/librosControladores');
const router = express.Router();

//==========CONTROLADORES===========
// Muestra todos los datos
router.get('/', controladoresLibros.getAll);
//Inserta a la tabla
router.post('/', controladoresLibros.create);
//Elimina a la tabla 
router.delete('/:id', controladoresLibros.remove);
//Muestra usuario especifico
router.get('/:id', controladoresLibros.getById);
//Actualizar datos
router.patch('/:id', controladoresLibros.update);
//Muestra todos los libros de un autor
router.get('/autor/:id', controladoresLibros.librosAutor);


module.exports = router;