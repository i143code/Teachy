var mongoose = require('mongoose');

var Teacher = mongoose.model('Teacher');
var District = mongoose.model('District');

module.exports = {
	retrieveChannels: function(req, res){
		District.findOne({_id: req.params.id})
			.populate('_user')
			.execute(function(err, district){
				if (err) {
					console.log('Error retrieving channels', err)
				} else {
					res.json(district.channels)
				}
			})
	},
	retrieveChannel: function(req, res){
		District.findOne({_id: req.params.district}, function(err, district){
			if (err) {
					console.log('Error retrieving channel', err);
				} else {
					var search = { found: false, idx: 0}
					for (var i = 0; i < district.channels.length; i++) {
						if (district.channels[i].name === req.params.channel) {
							search.found = true;
							search.idx = i;
						}
					}
					if (search.found) {
						res.json(district.channels[search.idx]);
					} else {
						res.json({error: "Channel doesn't exist! How did you do that!"})
					}
				}
		})
	},
	createChannel: function(req, res){
		District.findOne({_id: req.params.district}, function(err, district){
			if (err) {
				console.log('Error creating channel (1):', err);
			} else {
				var search = { found: false, idx: 0 };
				for (var i = 0; i < district.channels.length; i++) {
					if (district.channels[i].name === req.body.channelName) {
						search.found = true
					}
				}
				if (search.found) {
					res.json({error: "Channel already exists!"});
				} else {
					district.channels.push({name: req.body.channelName, users: [req.body.user_id], messages: [], districtWide: req.body.districtWide, directMessage: req.body.directMessage});
					district.save(function(err, district){
						if (err) {
							console.log('Error creating channel (2):', err);
						} else {
							res.json(district.channels[district.channels.length-1]);
						}
					})
				}
			}
		})
	},
	updateChannel: function(req, res){
		console.log('req.params.district',req.params.district)
		District.findOne({_id: req.params.district}, function(err, district){
			if (err) {
				console.log('Error updating channel (1)', err);
			} else {
				var search = { found: false, idx: 0 }
				for (var i = 0; i < district.channels.length; i++) {
					if (district.channels[i].name === req.params.channel) {
						search.found = true
						search.idx = i;
					}
				}
				if (search.found) {
					if (req.body.type === 'newMessage') {
						district.channels[search.idx].messages.push({user: req.body.user, message: req.body.message})
						district.save(function(err, district){
							if (err) {
								console.log('Error updating channel (2):', err);
							} else {
								res.json(district.channels[search.idx]);
							}
						})
					} else if (req.body.type === 'newUser') {
						var dupUser = { found: false, idx: 0 }
						for (var k = 0; k < district.channels[search.idx].users.length; k++) {
							if (district.channels[search.idx].users[k].name === req.body.user) {
								dupUser.found = true;
								dupUser.idx = k;
							}
						}
						if (dupUser.found) {
							res.json({error: "User already in this room! How did you do that!?"})
						} else {
							district.channels[search.idx].messages.push({user: 'Teachy', message: req.body.user + " has entered."});
							district.channels[search.idx].users.push({name: req.body.user});
							district.save(function(err, district){
								if (err) {
									console.log('Error updating channel (3):', err)
								} else {
									Teacher.findOne({_id: req.body.user_id}, function(err, teacher){
										if (err) {
											console.log('Error updating channel (4):', err);
										} else {
											teacher.channels.push({name: district.channels[search.idx].name, type: 'public'})
											teacher.save(function(err, teacher){
												if (err) {
													console.log('Error updating channel (5):', err)
												} else {
													res.json(district.channels[search.idx]);
												}
											})
										}
									})
								}
							})
						}
					} else if (req.body.type === 'exitChannel') {
						var userSearch = { found: false, idx: 0 };
						for (var j = 0; j < district.channels[search.idx].users.length; j++) {
							if (district.channels[search.idx].users[j] === req.body.user_id) {
								userSearch.found = true;
								userSearch.idx = j;
							}
						}
						district.channels[search.idx].messages.push({_user: 'System', message: req.body.userName + " has left the channel."})
						district.channels[search.idx].users.splice(userSearch.idx, 1);
						district.save(function(err, district){
							if (err) {
								console.log('Error updating channel (4)', err);
							} else {
								res.json(district.channels[search.idx]);
							}
						})
					}
				} else {
					res.json({error: "Channel doesn't exist! How did you do that?"})
				}
			}
		})
	}
}