var https = require('https');
var queryString = require('querystring');
var mongoose = require('mongoose');

var Teacher = mongoose.model('Teacher');
var District = mongoose.model('District');

module.exports = {
	retrieveTeacher: function(req, res){
		console.log('requesting teacher', req.params.id);
		Teacher.findOne({_id: req.params.id})
			.populate('_district')
			.exec(function(err, teacher){
				if (err) {
					console.log('Error retrieving teacher:', err)
				} else {
					res.json(teacher);
				}
			})
	},
	createTeacher: function(req, res){
		var newTeacher = new Teacher({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password, school: req.body.school});
		newTeacher.subjects = [];
		newTeacher.grades = [];
		var search = { found: false }
		for (var i = 0; i < req.body.grades.length; i++) {
			for (var j = 0; j < req.body.grades.length; j++) {
				if (req.body.grades[i] === req.body.grades[j]) {
					search.found = true
				}
				if (!search.found) {
					newTeacher.grades.push(req.body.grades[i]);
				} else {
					search.found = false;
				}
			}
		}
		for (var k = 0; k < req.body.subjects.length; k++) {
			for (var m = 0; m < req.body.subjects.length; m++) {
				if (req.body.subjects[k] === req.body.subjects[m]) {
					search.found = true;
				}
			}
			if (!search.found) {
				newTeacher.subjects.push(req.body.subjects[k]);
			} else {
				search.found = false;
			}
		}
		newTeacher.save(function(err, teacher){
			if (err) {
				console.log('Error creating teacher (1):', err)
			} else {
				District.findOne({_id: req.body.district_id}, function(err, district){
					if (err) {
						console.log('Error creating teacher (2):', err)
					} else {
						teacher._district = district._id;
						teacher.save(function(err, teacher){
							if (err) {
								console.log('Error creating teacher (3):', err)
							} else {
								res.json(teacher)
							}
						})
					}
				})
			}
		})
	},
	updateTeacher: function(req, res) {
		Teacher.findOne({_id: req.params.id}, function(err, teacher){
			if (err) {
				console.log('Error updating teacher (1):', err);
			} else {
				teacher.first_name = req.body.first_name;
				teacher.last_name = req.body.last_name;
				teacher.email = req.body.email;
				teacher.password = req.body.password;
				teacher.school = req.body.school;
				if (req.body.district) {
					District.findOne({_id: req.body.district}, function(err, district){
						if (err) {
							console.log('Error updating teacher (2):', err);
						} else {
							teacher._district = district._id;
							teacher.save(function(err, teacher){
								if (err) {
									console.log('Error updating teacher (3):', err);
								} else {
									res.json(teacher);
								}
							})
						}
					})
				} else {
					teacher.save(function(err, teacher){
						if (err) {
							console.log('Error updating teacher (4):', err);
						} else {
							res.json(teacher);
						}
					})
				}
			}
		})
	},
	loginTeacher: function(req, res){
		Teacher.findOne({email: req.body.email, password: req.body.password}, function(err, teacher){
			if (err) {
				console.log('Error loggin in teacher (1):', err);
				res.json({error: "Login failed!"});
			} else {
				res.json(teacher);
			}
		})
	},
	signupTeacher: function(req, res){
		console.log(req.body.userEmail);

		var postData = queryString.stringify({
			'recipients': 'johnhalbert@gmail.com',
			'return_path': 'signup@email.teachy.co',
			'template_id': 'verify-email'
		})

		var options = {
			method: 'POST',
			hostname: 'api.sparkpost.com',
			path: '/api/v1/transmissions',
			json: true,
			headers: {
				'Content-type': 'application/json',
				'Authorization': 'bb131006635c2ed2e5517ac52b6890f51d41787e'
			}
		}

		var request = https.request(options, function(response){
			console.log('STATUS:', response.statusCode);
			console.log('HEADERS:', JSON.stringify(response.headers))
			response.setEncoding('utf8');
			response.on('data', function(chunk){
				console.log('BODY:', chunk)
			})
			// console.log(response);
			// res.json(response);
		})

		request.write(postData);
		request.end()

		// http.post('https://api.sparkpost.com/api/v1?recipients=johnhalbert@gmail.com&return_path=signup@email.teachy.co&template_id=verify-email')



	}
}