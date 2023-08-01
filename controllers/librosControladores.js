const {Libro, Usuario} = require('../models');
const Op = require('sequelize').Op;

const getAll = async (req, res) => {
    try{

        let busqueda = req.query.busqueda;
        if(busqueda == null)busqueda = '';
        const libros = await Libro.findAll({
            where: {
                [Op.or]: [
                    {'$Libro.titulo$': {[Op.like]: '%'+busqueda+'%'}},
                    {'$Usuario.nombre$': {[Op.like]: '%'+busqueda+'%'}},
                    {'$Usuario.nombreUsuario$': {[Op.like]: '%'+busqueda+'%'}}
                ],
                [Op.and]:[
                    {'$Usuario.estatus$': 'activo'},
                ]
            },
            include: [{
                model: Usuario,
                required: false
            }]
        });
        res.send(libros);
    
    }catch(err){
            console.log(err);
            res.send({message: err.message});
    }
};

const create = async (req, res) => {
    try{
        const titulo = req.body.titulo;
        const cuerpo = req.body.cuerpo;
        const usuarioid = req.body.usuarioid;
        const autor = await Usuario.findByPk(usuarioid);
        
        if(autor == null) return res.json({message: 'No se encontro el autor'});
        const libro = await Libro.create({titulo, cuerpo, usuarioid});
        return res.send(libro);
        
    }catch(err){
        console.log({message: err.message});
    }
    };

const remove = (req, res) => {
        const id = req.params.id
        Libro.destroy({where: {id: id}});
        res.send({message: 'Usuario Eliminado'});
    };

    const getById = async (req, res) => {
        const id = req.params.id
        try{
            const libro = await Libro.findByPk(id, {include: [{model:Usuario, where:{estatus: 'activo'}}]});
            if(libro == null)return res.send({message: 'Este libro no se encuentra'})
            res.send(libro);
        }catch(err){
            console.log(err);
                res.send({message: err.message});
        }
    };

    const update = async (req, res) => {
        try{
            const id = req.params.id;
            const titulo = req.body.titulo;
            const cuerpo = req.body.cuerpo;
            const usuarioid = req.body.usuarioid;
            const result = await Libro.findByPk(id);
            await result.update({titulo, cuerpo, usuarioid});
            res.json(result);
        }catch(err){
            res.json({message: err.message});
        }
    };

    const librosAutor = async (req, res) => {
        const idAutor = req.params.id;
        let busqueda = req.query.busqueda;
        try{
            if(busqueda == null)busqueda='';
            const libros = await Libro.findAll({where: {usuarioid: idAutor, titulo: {[Op.like]: '%'+ busqueda +'%'} } } );
            res.send(libros);
        }catch(err){
            res.json({message: err.message});
        }
    };

    module.exports = {
        getAll,
        create,
        remove,
        getById,
        update,
        librosAutor
    };