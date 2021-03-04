const db = require('./index')

const Users = db.sequelize.define('clothes', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: db.Sequelize.INTEGER
    },
    user: db.Sequelize.TEXT,
    password: db.Sequelize.TEXT
},{
  freezeTableName: true,
  timestamps: false
}
);
module.exports = User
