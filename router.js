var express = require('express');
var router = express.Router();
var home = require('./controllers/home.controller');
var student = require('./controllers/student.controller');

module.exports = function(app){
  router.get('/', home.index);
  router.get('/jrfStudent/id/:id', student.id);
  //router.get('/faculty/id/:id', faculty.id);
  //router.get('/paper/id/:id', paper.id);
  //router.get('/book/id/:id', book.id);
  router.get('/jrfStudent/', student.list);
  //router.get('/faculty/', faculty.list);
  //router.get('/paper/', paper.list);
  //router.get('/book/', book.list);
  router.post('/jrfStudent/create', student.create);
  //router.post('/faculty/create', faculty.create);
  //router.post('/paper/create', paper.create);
  //router.post('/book/create', book.create);
  app.use(router);
};
