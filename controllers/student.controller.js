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
      relations: [],
      guides: []
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
   jrfModel.findOne({'_id': mongoose.Types.ObjectId(req.params.id)}, function(err, student){
     if(err) {throw err;}
     if(student){
       console.log(student);
       viewModel.student = student;
       console.log(viewModel.student.dateOfJoin.toString());
       for(var q = 0; q < student.books.length; q++){
         student.books[q] = mongoose.Types.ObjectId(student.books[q]);
       }
       for(q = 0; q < student.papers.length; q++){
         student.papers[q] = mongoose.Types.ObjectId(student.papers[q]);
       }
       bookModel.find({'_id': { $in: student.books}}, function(err, books){
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
       paperModel.find({'_id': { $in: student.papers}}, function(err, papers){
          if(err) {throw err;}
          if(papers){
            for(var q = 0; q < papers.length; q++){
              viewModel.papers.push({
                paper: papers[q].title,
                href: "/paper/id/" + papers[q]._id.toString()
              });
            }
            console.log(viewModel.papers);
          }
       });
       for(var y = 0; y < student.relations.length; y++){
         facultyModel.findOne({'_id': mongoose.Types.ObjectId(student.relations[y])}, insertFacultyRelative);
         jrfModel.findOne({'_id': mongoose.Types.ObjectId(student.relations[y])}, insertJrfRelative);
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
     phdAwarded: req.body.phdAwarded,
     admnNo: req.body.admnNo,
     thesisStatus: req.body.thesisStatus,
     email: req.body.email,
     mobile: req.body.mobile,
     bioId: req.body.bioId,
     entrance: req.body.entrance,
     duration: req.body.duration
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
     res.json({'students': viewModel.jrfs});
   });
 },
 basicInfo: function(req, res){
   jrfModel.findOne({'_id': mongoose.Types.ObjectId(req.body.id)}, function(err, student){
     res.json(student);
   });
 }
};
