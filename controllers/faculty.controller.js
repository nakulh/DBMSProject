var facultyModel = require('../models/faculty.model');
var jrfModel = require('../models/jrfStudent.model');
var bookModel = require('../models/book.model');
var paperModel = require('../models/paper.model');
var mongoose = require('mongoose');

module.exports = {
 id: function(req, res) {
   var viewModel = {
      faculty: {},
      books: [],
      papers: [],
      relations: [],
      studentsUnder: []
    };
    var insertFacultyRelative = function(err, relative){
      if(err) {throw err;}
      if(relative){
        viewModel.relations.push({
          name: relative.name,
          href: '/faculty/id/' + relative._id.toString()
        });
        console.log("relative name = " + relative.name);
      }
    };
    var insertJrfRelative = function(err, relative){
      if(err) {throw err;}
      if(relative){
        viewModel.relations.push({
          name: relative.name,
          href: '/jrfStudent/id/' + relative._id.toString()
        });
        console.log("relative name = " + relative.name);
      }
    };
   facultyModel.findOne({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, faculty){
     if(err) {throw err;}
     if(faculty){
       console.log(faculty);
       viewModel.faculty = faculty;
       for(var q = 0; q < faculty.books.length; q++){
         faculty.books[q] = mongoose.Types.ObjectId(faculty.books[q]);
       }
       for(q = 0; q < faculty.papers.length; q++){
         faculty.papers[q] = mongoose.Types.ObjectId(faculty.papers[q]);
       }
       bookModel.find({'_id': { $in: faculty.books}}, function(err, books){
         if(err) {throw err;}
         if(books){
           for(var q = 0; q < books.length; q++){
             viewModel.books.push({
               book: books[q].title,
               href: "/book/id/" + books[q]._id.toString()
             });
           }
         }
       });
       paperModel.find({'_id': { $in: faculty.papers}}, function(err, papers){
          if(err) {throw err;}
          if(papers){
            for(var q = 0; q < papers.length; q++){
              viewModel.papers.push({
                paper: papers[q].title,
                href: "/paper/id/" + papers[q]._id.toString()
              });
              console.log(papers);
            }
          }
       });
       for(var y = 0; y < faculty.relations.length; y++){
         facultyModel.findOne({'_id': mongoose.Types.ObjectId(faculty.relations[y])}, insertFacultyRelative);
         jrfModel.findOne({'_id': mongoose.Types.ObjectId(faculty.relations[y])}, insertJrfRelative);
       }
       res.render('faculty', viewModel);
     }
     else{
        res.redirect('/');
      }
   });
 },
 create: function(req, res){
   var newFaculty = new facultyModel({
     name: req.body.name,
     type: req.body.type,
     dateOfBirth: req.body.dateOfBirth,
     education: req.body.education,
     dateOfJoin: req.body.dateOfJoin,
     status: req.body.status,
     comment: req.body.comment,
   });
   newFaculty.save(function(err, faculty){
     if(err){
       throw err;
     }
     else{
       console.log("saved new faculty");
       res.render('saved');
     }
   });
 },
 list: function(req, res){
   var viewModel = {
     faculties: []
   };
   facultyModel.find({}, function(err, faculties){
     if(err){
       throw err;
     }
     if(faculties){
       for(var x = 0; x < faculties.length; x++){
         faculties[x].href = "/faculty/id/" + faculties[x]._id.toString();
         console.log(faculties[x].href);
       }
       viewModel.faculties = faculties;
     }
     else{
       console.log("no faculty data");
       viewModel.faculties = "no DATA";
     }
     res.json({
       faculties: viewModel.faculties
     });
   });
 },
 basicInfo: function(req, res){
   facultyModel.findOne({'_id': mongoose.Types.ObjectId(req.body.id)}, function(err, faculty){
     console.log(faculty);
     res.json(faculty);
   });
 }
};
