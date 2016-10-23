var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: {type: String},
  description: {type: String},
  publicationDate: {type: Date},
  studentAuthors: [],
  facultyAuthors: [],
  externalAuthors: [],
  isbn: {type: String},
});
module.exports = mongoose.model('Book', BookSchema);
