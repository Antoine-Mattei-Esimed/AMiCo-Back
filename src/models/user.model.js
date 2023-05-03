const { DataTypes } = require('sequelize');
const { sequelize } = require( './db');

const User = sequelize.define(
  'User',
  {
    id: { primaryKey: true, type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: 'user' },
);

module.exports = User;
