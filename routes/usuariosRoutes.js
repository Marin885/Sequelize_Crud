const express = require('express');
const controladoresUsuarios = require('../controllers/usuariosControladores');
const router = express.Router();

//==========CONTROLADORES===========
// Muestra todos los datos
router.get('/', controladoresUsuarios.getAll);
//Inserta a la tabla
router.post('/', controladoresUsuarios.create);
//Log In
router.post('/login', controladoresUsuarios.logIn);
//Consulta de pruebas
router.get('/pruebas', controladoresUsuarios.pruebas)
//Elimina a la tabla 
router.delete('/:id', controladoresUsuarios.remove);
//Muestra usuario especifico
router.get('/:id', controladoresUsuarios.getById);
//Actualizar datos
router.patch('/:id', controladoresUsuarios.update);

module.exports = router;