const User = require('../models/user');

module.exports = function (app) {

	app.get('/users', (req, res) => {
		User.getUsers((err, data) => {
			res.status(200).json(data);
		});
	});
	
	app.post('/users', (req, res) => {
		const userData = {
			id: null,
			username:req.body.username,
			password:req.body.password,
			email:req.body.email,
			created_at:null,
			updated_at:null
		};

		User.insertUser(userData, (err, data) => {
			if (data && data.insertId) {
				console.log(data);
				res.status(200).json({
					success:true,
					msg: 'USUARIO INSERTADO',
					data:data
				});
			} else {
				res.status(500).json({
					success:false,
					msg: 'Error'
				});
			}
		});
	});

	app.put('/users/:id', (req, res) => {

		const userData = {
			id: req.params.id,
			username:req.body.username,
			password:req.body.password,
			email:req.body.email,
			created_at:null,
			updated_at:null
		};

		User.updateUser(userData, (err, data) => {
			if (data && data.msg) {
				res.status(200).json({data});
			} else {
				res.status(500).json({
					success: false,
					msg: 'Error'
				});
			}
		});

	});

}