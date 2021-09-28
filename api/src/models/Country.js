const { DataTypes } = require('sequelize'); //!no lee datatypes
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'country',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '---',
      },
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: { len: [3] },
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '---',
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '---',
      },
      subregion: {
        type: DataTypes.STRING,
        defaultValue: '---',
      },
      area: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      // population: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 0,
      // },
    },
    { timestamps: false }
  );
};
