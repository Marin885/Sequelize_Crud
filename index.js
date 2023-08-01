const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuariosRoutes');
const librosRoutes = require('./routes/librosRoutes');
 
const db = require('./models');
const {Usuarios, Libro} = require('./models');

app.use(express.json());
//============RUTAS============
app.use('/usuarios',usuariosRoutes);
app.use('/libros', librosRoutes);
//=============================

app.listen(3000, async () => {
    try{
        await db.sequelize.sync();
        console.log('server running');
    }catch(err){
        console.log(err);
    }
});