
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize("tably", process.env.D_USER, process.env.D_PASS, {
  host: process.env.D_HOST,
  dialect: 'mysql',
  port: process.env.D_PORT,
  define: {
    freezeTableName: true
  }
})


let db = {};


db.sequelize = sequelize;
db.Sequelize = Sequelize;







module.exports = db;

