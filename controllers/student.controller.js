var facultyModel = require('../models/faculty.model');
var jrfModel = require('../models/jrfStudent.model');
var bookModel = require('../models/book.model');
var paperModel = require('../models/paper.model');
var mongoose = require('mongoose');

module.exports = {
 id: function(req, res) {
   var viewModel = {
      student: {},
      books: [],
      papers: [],
      relationNames: [],
      relationId: [],
      relationHref: [],
      guides: []
    };
    var insertFacultyRelative = function(err, relative){
      if(err) {throw err;}
      if(relative){
        viewModel.relationNames.push(relative.name);
        viewModel.relationHref.push('/faculty/id/' + relative._id.toString());
        console.log("relative id = " + relative._id.toString());
      }
    };
    var insertJrfRelative = function(err, relative){
      if(err) {throw err;}
      if(relative){
        viewModel.relationNames.push(relative.name);
        viewModel.relationHref.push('/jrfStudent/id/' + relative._id.toString());
        console.log("relative id = " + relative._id.toString());
      }
    };
   jrfModel.findOne({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, student){
     if(err) {throw err;}
     if(student){
       console.log(student);
       viewModel.student = student;
       bookModel.findOne({'_id': { $in: student.books}}, function(err, books){
         if(err) {throw err;}
         if(books){
           viewModel.books = books;
         }
       });
       paperModel.findOne({'_id': { $in: student.papers}}, function(err, papers){
          if(err) {throw err;}
          if(papers){
            viewModel.papers = paper;
          }
       });
       for(var y in student.relations){
         viewModel.relationId.push(x);
         facultyModel.findOne({'_id': student.relations[y]}, insertFacultyRelative(err, relative));
         jrfModel.findOne({'_id': student.relations[y]}, insertJrfRelative(err, relative));
       }
       res.render('jrfStudent', viewModel);
     }
     else{
        res.redirect('/');
      }
   });
 },
 create: function(req, res){
   var newJrfStudent = new jrfModel({
     name: req.body.name,
     type: req.body.type,
     dateOfBirth: req.body.dateOfBirth,
     education: req.body.education,
     dateOfJoin: req.body.dateOfJoin,
     status: req.body.status,
     submissionDate: req.body.submissionDate,
     awardDate: req.body.awardDate,
     comment: req.body.comment,
     phdAwarded: req.body.phdAwarded
   });
   newJrfStudent.save(function(err, jrf){
     if(err){
       throw err;
     }
     else{
       console.log("saved new jrf");
       res.render('saved');
     }
   });
 },
 list: function(req, res){
   var viewModel = {
     jrfs: []
   };
   jrfModel.find({}, function(err, jrfs){
     if(err){
       throw err;
     }
     if(jrfs){
       for(var x = 0; x < jrfs.length; x++){
         jrfs[x].href = "/jrfStudent/id/" + jrfs[x]._id.toString();
         console.log(jrfs[x].href);
       }
       viewModel.jrfs = jrfs;
     }
     else{
       console.log("no jrf data");
       viewModel.jrfs = "no DATA";
     }
     res.render('jrfList', viewModel);
   });
 }
};
