const db = require('./index')
const bcrypt =  require ('bcrypt')
const Users = db.sequelize.define('users', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: db.Sequelize.INTEGER
    },
    user:{
      type:db.Sequelize.TEXT,
      allowNull:false
    }, 
    password:{
      allowNull:false,
      type: db.Sequelize.TEXT
    }
  },{

  freezeTableName: true,
  timestamps: false
});

Users.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
Users.prototype.validPassword = function(password){
  return bcrypt.compareSync(password, this.localPassword);
};

module.exports = Users
