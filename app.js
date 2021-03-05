const bodyParser = require("body-parser");
      express = require("express")
      app   = express()
      cors = require("cors");


require('dotenv').config()

    




db  = require('./models/index')
db.users = require('./models/users')
db.tabs = require('./models/tabs')
Op = db.sequelize


db.users.hasMany(db.tabs)
db.tabs.belongsTo(db.users,{
  onDelete: "CASCADE",
  foreignKey: {
    allowNull:false
  }
});
db.sequelize.sync({logging:console.log})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




require('./routes') (app)



app.listen(8887,function(){
    console.log("Server started on port 8887")
})