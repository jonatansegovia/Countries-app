const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'activities',
    {
      name: { type: DataTypes.STRING },
      difficulty: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      },
      duration: { type: DataTypes.STRING },
      season: {
        type: DataTypes.ENUM('autumn', 'winter', 'summer', 'spring'),
      },
    },
    { timestamps: false }
  );
};
