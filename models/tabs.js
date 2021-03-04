const db = require('./index')

const Tabs = db.sequelize.define('clothes', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: db.Sequelize.INTEGER
    },
    img: db.Sequelize.TEXT,
    name: db.Sequelize.TEXT,

},{
  freezeTableName: true,
  timestamps: false
}
);
module.exports = User


// linked to users, must be logged in?, only input tabs?p