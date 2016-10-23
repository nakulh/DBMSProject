var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var JrfStudentSchema = new Schema({
  type: {type: String},
  name: {type: String},
  dateOfBirth: {type: Date},
  papers: [],
  books: [],
  education: {type: String},
  relations: [],
  dateOfJoin: {type: Date},
  status: {type : String},
  submissionDate: {type: Date},
  awardDate: {type: String},
  comment: {type: String},
  guides: [],
  coGuides: [],
  phdAwarded: {type: Boolean},
  holidays: []
});
module.exports = mongoose.model('JrfStudent', JrfStudentSchema);
