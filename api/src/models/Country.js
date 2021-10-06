const { DataTypes } = require('sequelize');
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
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '---',
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    { timestamps: false }
  );
};
