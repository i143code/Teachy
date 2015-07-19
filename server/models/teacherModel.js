var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeacherSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	_district: { type: Schema.ObjectId, ref: 'District' },
	school: String,
	subjects: [{ subject: String }],
	grades: [{ grade: String }],
	channels: [{name: String}]
})

var Teacher = mongoose.model('Teacher', TeacherSchema);