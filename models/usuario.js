'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Libro}) {
      // define association here
      this.hasMany(Libro, {foreignKey: 'usuarioid'});
    }
  }
  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    correo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    estatus: {
      type:DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo',
      validate: {
        notEmpty: true
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  });
  return Usuario;
};