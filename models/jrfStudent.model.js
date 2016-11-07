var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var JrfStudentSchema = new Schema({
  type: {type: String},
  name: {type: String},
  admnNo: {type: String},
  dateOfBirth: {type: Date},
  papers: [],
  books: [],
  education: {type: String},
  thesisStatus: {type: String},
  email: {type: String},
  mobile: {type: String},
  bioId: {type: String},
  relations: [],
  dateOfJoin: {type: Date},
  status: {type : String},
  submissionDate: {type: Date},
  awardDate: {type: String},
  comment: {type: String},
  entrance: {type: String},
  guides: [],
  coGuides: [],
  phdAwarded: {type: Boolean},
  holidays: [],
  duration: {type: String}
});
module.exports = mongoose.model('JrfStudent', JrfStudentSchema);
