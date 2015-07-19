var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/teachy');

require('../server/models/teacherModel');
require('../server/models/districtModel');
