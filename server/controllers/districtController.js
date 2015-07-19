var mongoose = require('mongoose');

var Teacher = mongoose.model('Teacher');
var District = mongoose.model('District');

module.exports = {
	retrieveDistrict: function(req, res){
		District.findOne({_id: req.params.id}, function(err, district){
			if (err) {
				console.log('Error retrieving district (1):', err)
			} else {
				Teacher.populate(docs, {
					path: 'channels.users',
					select: 'first_name last_name'
				}, function(err, district){
					if (err) {
						console.log('Error retrieving district (2):', err);
					} else {
						Teacher.populate(docs, {
							path: 'teachers',
							select: 'first_name last_name'
						}, function(err, district){
							if (err) {
								console.log('Error retrieving district (3):', err)
							} else {
								res.json(district);
							}
						})
					}
				})
			}
		})
	},
	retrieveDistricts: function(req, res){
		District.find({}, function(err, districts){
			if (err) {
				console.log('Error retrieving districts:', err);
			} else {
				res.json(districts)
			}
		})
	}
}