var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var FacultySchema = new Schema({
  type: {type: String},
  name: {type: String},
  age: {type: Number},
  papers: [],
  books: [],
  education: {type: String},
  relations: {},
  dateOfJoin: {type: Date},
  comment: {type: String},
});
module.exports = mongoose.model('Faculty', FacultySchema);
