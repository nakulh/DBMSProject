var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var FacultySchema = new Schema({
  type: {type: String},
  name: {type: String},
  dateOfBirth: {type: Date},
  studentsUnder: [],
  papers: [],
  books: [],
  education: {type: String},
  relations: [],
  dateOfJoin: {type: Date},
  comment: {type: String},
  status: {type : String}
});
module.exports = mongoose.model('Faculty', FacultySchema);
