const {Usuario, Libro} = require('../models');
const validator = require('email-validator');
const { passwordStrength } = require('check-password-strength')
const bcrypt = require('bcrypt');
//========================================================================

const getAll = async (req, res) => {
    try{
        
        

        const usuarios = await Usuario.findAll({where:{estatus:'activo'}, include: [Libro]});
        res.send(usuarios);
    }catch(err){
            console.log(err);
            res.send({message: err.message});
    }
};

const create = async (req, res) => {
    try{
        const nombre = req.body.nombre;
        const correo = req.body.correo;
        const nombreUsuario = req.body.nombreUsuario;
        const password = req.body.password;
        const estatus = req.body.estatus;

        //Checa lo confiable de una contraseña & encripta
        let strength = 0;
        if(password.length >= 5)strength += 1;
        if(password.match(/[a-z]/) && password.match(/[A-Z]/))strength += 1;
        if(password.match(/\d/))strength += 1;
        if(password.match(/[^a-zA-Z\d]/))strength += 1;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        //Variables de validaciones
        const correobd = await Usuario.findOne({where: {correo: correo}});
        const nombreUsuariobd = await Usuario.findOne({where: {nombreUsuario:nombreUsuario}});
        const correoValido = validator.validate(correo);
        

        //validaciones
        if(!correoValido)return res.json({message: 'No se puede crear, correo no valido'})
        if(correobd != null)return res.json({message: 'No se puede crear, este correo ya existe'})
        if(nombreUsuariobd != null)return res.json({message: 'No se puede crear, este nombre de usuario ya existe'})
        if(strength != 4)return res.send({message: 'La contraseña debe contener al menos 5 caracteres, una mayuscula, un numero y un simbolo'});
        


        const usuario = await Usuario.create({nombre, correo, nombreUsuario, password:hash, estatus});
        res.send(usuario);
        
    }catch(err){
        console.log({message: err.message});
    }
};

    const remove = async (req, res) => {
        const id = req.params.id
        const libroId = await Libro.findOne({where: {usuarioid: id}}); 
        if(libroId != null) return res.json({message: 'Este autor no puede ser eliminado'})
        Usuario.destroy({where: {id: id}});
        res.send({message: 'Usuario Eliminado'});
    };

    const getById = async (req, res) => {
        const id = req.params.id
        try{
            const usuario = await Usuario.findOne({where: {id: id, estatus:'activo'}, include: [Libro]});
            if(usuario == null)return res.send({message: 'Este usuario no se encuentra'});
            console.log(usuario);
            res.send(usuario);
        }catch(err){
            console.log(err);
                res.send({message: err.message});
        }
    };

    const update = async (req, res) => {
        try{
            const id = req.params.id;
            const nombre = req.body.nombre;
            const correo = req.body.correo;
            const nombreUsuario = req.body.nombreUsuario;
            const password = req.body.password;
            const result = await Usuario.findByPk(id);
            await result.update({nombre, correo, nombreUsuario, password});
            res.json(result);
        }catch(err){
            res.json({message: err.message});
        }
    };

    const logIn = async (req, res) => {
        const nombreUsuario = req.body.nombreUsuario;
        const password = req.body.password;
        const usuario = await Usuario.findOne({where: {nombreUsuario: nombreUsuario}});
        if(usuario == null)return res.send({message: 'Nombre de usuario equivocado'})
        
        const noCrypt = await bcrypt.compare(password,usuario.password);
        if(noCrypt == false)return res.send({message: 'Contraseña equivocada'})
        if(usuario.nombreUsuario == req.body.nombreUsuario && noCrypt == true)res.send({message: 'Usuario valido'})
    };

    const pruebas = async (req, res) => {

        // const passwordValid = 'Tony1510#';

        // let strength = 0;
        // if(passwordValid.length >= 5)strength += 1;
        // if(passwordValid.match(/[a-z]/) && passwordValid.match(/[A-Z]/))strength += 1;
        // if(passwordValid.match(/\d/))strength += 1;
        // if(passwordValid.match(/[^a-zA-Z\d]/))strength += 1;
        // console.log(strength);
        
        
        // const saltRounds = 10;
        // const password = 'Dmi52320';
        // const hash = await bcrypt.hash(password, saltRounds);
        // console.log(password);
        // console.log(hash);

        // const noCrypt = await bcrypt.compare(password,hash);
        // console.log(noCrypt);



        //===========Pruebas para el log in==============
        // const nombreUsuario = req.body.nombreUsuario;
        // const password = req.body.password;
        // const usuario = await Usuario.findOne({where: {nombreUsuario: nombreUsuario}});
        // const noCrypt = await bcrypt.compare(password,usuario.password);
        // if(usuario.nombreUsuario == req.body.nombreUsuario && noCrypt == true)res.send({message: 'Usuario valido'})
        
    };

module.exports = {
    getAll,
    create,
    remove,
    getById,
    update,
    logIn,
    pruebas
};
