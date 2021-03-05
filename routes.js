const saltRounds = 10;
const bcrypt = require("bcrypt");
const authJwt = require('./router/verifyJwt')
const jwt = require('jsonwebtoken');



db = require("./models/index");
Users = require("./models/users");
Tabs = require("./models/tabs");


sequelize = db.sequelize;
Op = db.Sequelize.Op;
db.users = Users;
db.Tabs = Tabs;



module.exports = (app) => {
  let router = require("express").Router();
    app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});



  router.get("/tabs",authJwt, function (req, res) {
    const user = req.query.userid || undefined;
   

    if (user == undefined) {
      console.log("Please login");
      res.status(404).send("oh no")
    } else {
      const condition = userid ? { userid: userid } : null;
      db.tabs
        .findAll({ where: condition })
        .then((tabs) => {
          console.log(tabs);
          res.send(tabs);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({ msg: "No tabs found for your account", details: err });
        });
    }
  });

  router.post("/tabs",authJwt, function (req, res) {
    const user = req.query.userid;
    const tab = req.body.tab;
    const name = req.body.name;
    if (user == undefined) {
      print("Please login");
    } else {
      const newTab = { name: name, tab: tab, userId: user };
      db.tabs
        .create(newTab)
        .then((tabs) => {
          console.log(tabs);
          res.send(tabs);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(404)
            .json({
              msg: "Soemthing went wrong with the tab creation",
              details: err,
            });
        });
    }
  });

  router.post("/login", function (req, res) {
    
    const user = req.body.user;
    db.users.findOne({where: { user },})
      .then((user) => {
        if (!user) {
			return res.status(404).send({ reason: 'User Not Found.' });
		}
        bcrypt.compare(req.body.password,user.password,function (err, result) {
            if (result == false) {
              res.status(404).end();
            } else {
                let token = jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
              res.send({
                  accessToken: token,
                  userid: user.id,
                  username: user.user
              });
            }
          }
        );
      });
  });

  router.post("/register", function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const newUser = { user: req.body.user, password: hash };
      db.users
        .create(newUser)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({
              msg: "Something went wrong when creating a new user",
              details: err,
            });
        });
    });
  });

  router.put("/update/:id",authJwt, function (req, res) {
    const id = req.params.id;
    const userid = req.query.id;
    const updatedValues = { name: req.body.name, tab: req.body.tab };
    db.tabs
      .update(updatedValues, { where: { id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Tab has been updated" });
        } else {
          res.send({message: "Cannot update this tab",});
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
      });
  });

  router.delete('/delete/:id',authJwt, function(req,res){
      const id = req.params.id
      db.tabs.destroy({where: {id:id}}).then(num => {
        if (num == 1) {
            res.send({message: "Tab has been deleted"});
        } else {
            res.send({message: "Cannot delete this tab."});
          }
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
      });
  })


  app.use("/api", router);
};
