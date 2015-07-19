var mongoose = require('mongoose');

var Teacher = mongoose.model('Teacher');
var District = mongoose.model('District');

module.exports = {
	retrieveDistrict: function(req, res){
		District.findOne({_id: req.params.id}, function(err, district){
			if (err) {
				console.log('Error retrieving district:', err)
			} else {
				res.json(district);
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