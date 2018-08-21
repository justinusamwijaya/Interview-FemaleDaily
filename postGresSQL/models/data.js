'use strict';
module.exports = (sequelize, DataTypes) => {
  var Data = sequelize.define('Data', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Item: DataTypes.STRING,
    Quantity: DataTypes.INTEGER,
    TotalPrice: DataTypes.FLOAT
  }, {});
  Data.associate = function(models) {
    // associations can be defined here
  };
  return Data;
};