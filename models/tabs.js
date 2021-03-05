const db = require('./index')

const Tabs = db.sequelize.define('tabs', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: db.Sequelize.INTEGER
    },
    name:{ 
      type:db.Sequelize.TEXT,
      allowNull: false
    },
    tab:{ 
      type:db.Sequelize.TEXT,
      allowNull:false
    }
},{
  freezeTableName: true,
  timestamps: false
});


module.exports = Tabs

