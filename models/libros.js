'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Usuario}) {
      // define association here
      this.belongsTo(Usuario, {foreignKey: 'usuarioid'});
    }

    toJSON()
    {
      return{...this.get(), usuarioid: undefined};
    }

  }
  libros.init({
    titulo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    cuerpo:{
      type:DataTypes.STRING,
      allowNull: false
    },
    usuarioid:{
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    tableName: 'libros',
    modelName: 'Libro',
  });
  return libros;
};