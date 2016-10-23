var facultyModel = require('../models/faculty.model');
var jrfModel = require('../models/jrfStudent.model');
var bookModel = require('../models/book.model');
var paperModel = require('../models/paper.model');
var mongoose = require('mongoose');

module.exports = {
 id: function(req, res) {
   var viewModel = {
      book: {},
      authors: []
    };
   bookModel.findOne({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, book){
     if(err) {throw err;}
     if(book){
       console.log(book);
       viewModel.book = book;
       for(var q = 0; q < book.studentAuthors.length; q++){
         book.studentAuthors[q] = mongoose.Types.ObjectId(book.studentAuthors[q]);
       }
       for(q = 0; q < book.facultyAuthors.length; q++){
         book.facultyAuthors[q] = mongoose.Types.ObjectId(book.facultyAuthors[q]);
       }
       jrfModel.find({'_id': { $in: book.studentAuthors}}, function(err, students){
         if(err){ console.log(err); }
         if(students){
           for(var x = 0; x < students.length; x++){
             viewModel.authors.push({
               name: students[x].name,
               href: "/jrfStudent/id/" + students[x]._id.toString()
             });
           }
         }
       });
       facultyModel.find({'_id': { $in: book.facultyAuthors}}, function(err, faculties){
         if(err){ console.log(err); }
         if(faculties){
           for(var x = 0; x < faculties.length; x++){
             viewModel.authors.push({
               name: faculties[x].name,
               href: "/faculty/id/" + faculties[x]._id.toString()
             });
           }
         }
       });
       res.render('book', viewModel);
     }
     else{
        res.redirect('/');
      }
   });
 },
 create: function(req, res){
   var newBook = new bookModel({
     title: req.body.title,
     description: req.body.description,
     publicationDate: req.body.publicationDate,
     isbn: req.body.isbn,
   });
   newBook.save(function(err, book){
     if(err){
       throw err;
     }
     else{
       console.log("saved new book");
       res.render('saved');
     }
   });
 },
 list: function(req, res){
   var viewModel = {
     books: []
   };
   bookModel.find({}, function(err, books){
     if(err){
       throw err;
     }
     if(books){
       for(var x = 0; x < books.length; x++){
         books[x].href = "/book/id/" + books[x]._id.toString();
         console.log(books[x].href);
       }
       viewModel.books = books;
     }
     else{
       console.log("no book data");
       viewModel.books = [];
     }
     res.json({'books': viewModel.books});
   });
 }
};
