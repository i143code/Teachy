var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DistrictSchema = new mongoose.Schema({
	name: String,
	schools: [{name: String, zip: Number}],
	teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
	channels: [{
		name: String, 
		users: [{
			type: Schema.Types.ObjectId, ref: 'Teacher'
		}], 
		messages: [{
			_user: { type: Schema.ObjectId, ref: 'Teacher' }, 
			message: String, 
			created: {type: Date, default: Date.now}
		}],
		districtWide: Boolean,
		directMessage: Boolean
	}]
})

var District = mongoose.model('District', DistrictSchema);