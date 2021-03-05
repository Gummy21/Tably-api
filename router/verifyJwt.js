const jwt = require('jsonwebtoken');

db.users = require('../models/users')
const User = db.users;

require('dotenv').config()

function verifyToken(req, res, next) {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}

module.exports = verifyToken
