var facultyModel = require('../models/faculty.model');
var jrfModel = require('../models/jrfStudent.model');
var bookModel = require('../models/book.model');
var paperModel = require('../models/paper.model');
var mongoose = require('mongoose');

module.exports = {
 id: function(req, res) {
   var viewModel = {
      paper: {},
      authors: []
    };
   paperModel.findOne({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, paper){
     if(err) {throw err;}
     if(paper){
       console.log(paper);
       viewModel.paper = paper;
       for(var q = 0; q < paper.studentAuthors.length; q++){
         paper.studentAuthors[q] = mongoose.Types.ObjectId(paper.studentAuthors[q]);
       }
       for(q = 0; q < paper.facultyAuthors.length; q++){
         paper.facultyAuthors[q] = mongoose.Types.ObjectId(paper.facultyAuthors[q]);
       }
       jrfModel.find({'_id': { $in: paper.studentAuthors}}, function(err, students){
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
       facultyModel.find({'_id': { $in: paper.facultyAuthors}}, function(err, faculties){
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
       res.render('paper', viewModel);
     }
     else{
        res.redirect('/');
      }
   });
 },
 create: function(req, res){
   var newPaper = new paperModel({
     title: req.body.title,
     description: req.body.description,
     publicationDate: req.body.publicationDate,
     isbn: req.body.isbn,
   });
   newPaper.save(function(err, paper){
     if(err){
       throw err;
     }
     else{
       console.log("saved new paper");
       res.render('saved');
     }
   });
 },
 list: function(req, res){
   var viewModel = {
     papers: []
   };
   paperModel.find({}, function(err, papers){
     if(err){
       throw err;
     }
     if(papers){
       for(var x = 0; x < papers.length; x++){
         papers[x].href = "/paper/id/" + papers[x]._id.toString();
         console.log(papers[x].href);
       }
       viewModel.papers = papers;
     }
     else{
       console.log("no paper data");
       viewModel.papers = "no DATA";
     }
     res.json({
       papers: viewModel.papers
     });
   });
 }
};
