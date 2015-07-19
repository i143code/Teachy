var mongoose = require('mongoose');

var Teacher = mongoose.model('Teacher');
var District = mongoose.model('District');

module.exports = {
	retrieveDistrict: function(req, res){
		District.findOne({_id: req.params.id}, function(err, district){
			if (err) {
				console.log('Error retrieving district (1):', err)
			} else {
				Teacher.populate(district, {
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
	},
	retrieveDistricts: function(req, res){
		District.find({}, function(err, districts){
			if (err) {
				console.log('Error retrieving districts:', err);
			} else {
				res.json(districts)
			}
		})
	},
	retrieveSchoolsByZip: function(req, res){
		District.find({}, function(err, districts){
			if (err) {
				console.log('Error retrieving schools', err);
			} else {
				var schools = [];
				var district;
				for (var i = 0; i < districts.length; i++) {
					for (var j = 0; j < districts[i].schools.length; j++){
						if (districts[i].schools[j].zip === +req.params.zip) {
							schools.push(districts[i].schools[j]);
							district = districts[i]._id;
						}
					}
				}
				res.json({schoolList: schools, districtId: district});
			}
		})
	}
}