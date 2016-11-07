var express = require('express');
var router = express.Router();
var home = require('./controllers/home.controller');
var student = require('./controllers/student.controller');
var faculty = require('./controllers/faculty.controller');
var paper = require('./controllers/paper.controller');
var book = require('./controllers/book.controller');
var api = require('./controllers/api.controller');



module.exports = function(app){
  router.get('/', home.index);
  router.get('/jrfStudent/id/:id', student.id);
  router.get('/jrfStudent/:id/edit', function(req, res){
    res.render('jrfEdit');
  });
  router.post('/editJrfInfo', student.basicInfo);
  router.get('/faculty/id/:id', faculty.id);
  router.get('/faculty/:id/edit', function(req, res){
    res.render('facultyEdit');
  });
  router.post('/editFacultyInfo', faculty.basicInfo);
  router.get('/paper/id/:id', paper.id);
  router.get('/book/id/:id', book.id);
  router.get('/jrfStudent/', function(req, res){
    res.render('jrfList');
  });
  router.get('/jrfStudentList/', student.list);
  router.get('/facultyList/', faculty.list);
  router.get('/faculty', function(req, res){
    res.render('facultyList');
  });
  router.get('/paperList/', paper.list);
  router.get('/paper/', function(req, res){
    res.render("paperList");
  });
  router.get('/bookList/', book.list);
  router.get('/book/', function(req, res){
    res.render("bookList");
  });
  router.post('/jrfStudent/create', student.create);
  router.post('/faculty/create', faculty.create);
  router.post('/paper/create', paper.create);
  router.post('/book/create', book.create);
  router.get('/list/', api.list);
  router.post('/relate/', api.relate);
  router.post('/addInsideAuthor/', api.addInsideAuthor);
  router.post('/print/', api.print);
  router.post('/saveInfo', api.saveInfo);
  app.use(router);
};
