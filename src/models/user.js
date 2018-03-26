const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'apirest'
});

let userModel = {};

userModel.getUsers = (callback) => {
	if (connection) {
		connection.query(
			'SELECT * FROM users ORDER BY id',
			(err, rows) => {
				if (err) {
					throw err;
				} else {
					callback(null, rows);
				}
			}
		)
	}
};

userModel.insertUser = (userData, callback) => {
	if (connection) {
		connection.query(
			'INSERT INTO users SET ?', userData,
			(err, result) => {
				if (err) {
					throw err;
				} else {
					callback(null, {'insertId': result.insertId})
				}
			}
		)
	}
};

userModel.updateUser = (userData, callback) => {
	if (connection) {
		const sql = `
			UPDATE users SET
			username = ${connection.escape(userData.username)},
			email = ${connection.escape(userData.email)},
			password = ${connection.escape(userData.password)},
			WHERE id = ${userData.id}`;
			
		connection.query(sql, (err, result) => {
			if (err) {
				throw err;
			}
			else {
				callback(null, {
					"msg": "success"
				});
			}	
		});
	}
};

userModel.deleteUser = (id, callback) => {
	if (connection) {
		const sql = `
			SELECT * FROM users WHERE id = ${connection.escape(id)}
		`;
	connection.query(sql, (err, row) => {
      if (row) {
        var sql = `DELETE FROM users WHERE id=` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else{
            callback(null, {
              "msg": "deleted"
            });
          }
        });
      } else {
        callback(null, {
          "msg": "not Exists"
        });
      }
    });
	}
};

module.exports = userModel;