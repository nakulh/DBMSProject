var facultyModel = require('../models/faculty.model');
var jrfModel = require('../models/jrfStudent.model');
var bookModel = require('../models/jrfStudent.model');
var paperModel = require('../models/paper.model');


module.exports = {
 index: function(req, res) {
   res.render('index');
 }
};
