var facultyModel = require('../models/faculty.model');
var jrfModel = require('../models/jrfStudent.model');
var bookModel = require('../models/book.model');
var paperModel = require('../models/paper.model');
var mongoose = require('mongoose');
var port = require('../port');
module.exports = {
  list: function(req, res){
    var viewJrfs = [];
    var viewFaculties = [];
    console.log("getting list of all");
    jrfModel.find({}, function(err, jrfs){
      console.log("got some");
      if(err){console.log(err);}
      if(jrfs){
          for(var x = 0; x < jrfs.length; x++){
            viewJrfs.push({
              name: jrfs[x].name,
              id: jrfs[x]._id
            });
          }
      }
      facultyModel.find({}, function(err, faculties){
        console.log("got some");
        if(err){console.log(err);}
        if(faculties){
            for(var x = 0; x < faculties.length; x++){
              viewFaculties.push({
                name: faculties[x].name,
                id: faculties[x]._id
              });
            }
        }
        res.json({
          'students': viewJrfs,
          'faculties': viewFaculties
        });
      });
    });
  },
  relate: function(req, res){
    var sourceType, desType;
    if(req.body.sourceType == "jrfStudent"){
      sourceType = jrfModel;
    }
    else{
      sourceType = facultyModel;
    }
    if(req.body.desType == "student"){
      desType = jrfModel;
    }
    else{
      desType = facultyModel;
    }
    if(req.body.desId == req.body.sourceId){
      res.json({
        error: "Can't relative with itself",
        done: false
      });
    }
    else{
      sourceType.findOne({'_id': mongoose.Types.ObjectId(req.body.sourceId)}, function(err, guy){
        if(err){console.log(err);}
        console.log("guy is");
        console.log(guy);
        if(guy){
            if(guy.relations.indexOf(req.body.desId) >= 0){
              console.log("already present");
              res.json({
                error: "Already Present",
                done: false
              });
            }
            else{
              guy.relations.push(req.body.desId);
              sourceType.update({ '_id': mongoose.Types.ObjectId(req.body.sourceId)}, { '$set': { 'relations': guy.relations}}, function(err){
                if(err){console.log(err);}
                else{
                  console.log("updated");
                }
                desType.update({ '_id': mongoose.Types.ObjectId(req.body.desId)}, {$push: {relations: req.body.sourceId}}, {upsert: true}, function(err){
                  if(err){console.log(err);}
                  else{
                    console.log("updated in desType");
                  }
                  res.json({
                    done: "Related",
                    error: false
                  });
                });
              });
            }
        }
      });
    }
  },
  addInsideAuthor: function(req, res){
    var sourceType, desType;
    var author = "";
    if(req.body.sourceType == "paper"){
      sourceType = paperModel;
    }
    else{
      sourceType = bookModel;
    }
    if(req.body.desType == "student"){
      desType = jrfModel;
      author = "studentAuthors";
    }
    else{
      desType = facultyModel;
      author = "facultyAuthors";
    }
    console.log("desId = " + req.body.desId);
    console.log("sourceId = " + req.body.sourceId);
    console.log("sourceType = " + req.body.sourceType);
    console.log("desType = " + req.body.desType);
    sourceType.findOne({'_id': mongoose.Types.ObjectId(req.body.sourceId)}, function(err, pub){
      if(err) {console.log(err);}
      if(pub){
        if(pub[author].indexOf(req.body.desId) >= 0){
          res.json({
            error: "author already present",
            done: false
          });
        }
        else{
          pub[author].push(req.body.desId);
          if(author == "studentAuthors")
            sourceType.update({ '_id': mongoose.Types.ObjectId(req.body.sourceId)}, { '$set': { 'studentAuthors': pub[author]}}, function(err){
              if(req.body.sourceType == "paper"){
                desType.update({ '_id': mongoose.Types.ObjectId(req.body.desId)}, {$push: {'papers': req.body.sourceId}}, {upsert: true}, function(err){
                  if(err){console.log(err);}
                  else{
                    console.log("updated in desType");
                  }
                  res.json({
                    done: "added an author",
                    error: false
                  });
                });
              }
              else{
                desType.update({ '_id': mongoose.Types.ObjectId(req.body.desId)}, {$push: {'books': req.body.sourceId}}, {upsert: true}, function(err){
                  if(err){console.log(err);}
                  else{
                    console.log("updated in desType");
                  }
                  res.json({
                    done: "added an author",
                    error: false
                  });
                });
              }
            });
          else
            sourceType.update({ '_id': mongoose.Types.ObjectId(req.body.sourceId)}, { '$set': { 'facultyAuthors': pub[author]}}, function(err){
              if(req.body.sourceType == "paper"){
                desType.update({ '_id': mongoose.Types.ObjectId(req.body.desId)}, {$push: {'papers': req.body.sourceId}}, {upsert: true}, function(err){
                  if(err){console.log(err);}
                  else{
                    console.log("updated in desType");
                  }
                  res.json({
                    done: "added an author",
                    error: false
                  });
                });
              }
              else{
                desType.update({ '_id': mongoose.Types.ObjectId(req.body.desId)}, {$push: {'books': req.body.sourceId}}, {upsert: true}, function(err){
                  if(err){console.log(err);}
                  else{
                    console.log("updated in desType");
                  }
                  res.json({
                    done: "added an author",
                    error: false
                  });
                });
              }
            });
        }
      }
    });
  },
  print: function(req, res){
    var model;
    var str = "";
    /*port.arduino.write("skjsdfnjk \n sdfnkjsdf\nntrasd$", function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('message written');
    });*/
    if(req.body.type == "jrfStudent"){
      model = jrfModel;
    }
    else if(req.body.type == "faculty"){
      model = facultyModel;
    }
    else if(req.body.type == "book"){
      model = bookModel;
    }
    else if(req.body.type == "paper"){
      model = paperModel;
    }
    console.log(req.body.id);
    model.findOne({_id: mongoose.Types.ObjectId(req.body.id)}, function(err, entity){
      //console.log(entity);
      for(var key in entity){
        if(key == "type" || key == "name" || key == "admnNo" || key == "education" || key == "email" || key == "mobile" || key == "comment"){
          str += key + ": " + entity[key] + "\n";
        }
      }
      str = str + "\n********$";
      console.log(str);
      if(port.arduino)
        port.arduino.write(str, function(err) {
          if (err) {
            return console.log('Error on write: ', err.message);
          }
          console.log('message written');
        });
    });
    res.json({printing: true});
  },
  saveInfo: function(req, res){
    console.log(req.body.id);
    var model;
    if(req.body.type == "jrfStudent"){
      model = jrfModel;
      model.update({"_id": mongoose.Types.ObjectId(req.body.id)}, {"name": req.body.entity.name,
                                                           "type": req.body.entity.type,
                                                           "admnNo": req.body.entity.admnNo,
                                                           "education": req.body.entity.education,
                                                           "thesisStatus": req.body.entity.thesisStatus,
                                                           "email": req.body.entity.email,
                                                           "mobile": req.body.entity.mobile,
                                                           "bioId": req.body.entity.bioId,
                                                           "status": req.body.entity.status,
                                                           "comment": req.body.entity.comment,
                                                           "entrance": req.body.entity.entrance,
                                                           "duration": req.body.entity.duration
                                                         }, function(err, result){
                                                            console.log(result);
                                                            res.redirect("http://localhost:5000/jrfStudent/id/" + req.body.id);
                                                        });
    }
    else if(req.body.type == "faculty"){
      model = facultyModel;
      model.update({"_id": mongoose.Types.ObjectId(req.body.id)}, {"name": req.body.entity.name,
                                                           "type": req.body.entity.type,
                                                           "education": req.body.entity.education,
                                                           "status": req.body.entity.status,
                                                           "comment": req.body.entity.comment,
                                                         }, function(err, result){
                                                            console.log(result);
                                                            res.redirect("http://localhost:5000/faculty/id/" + req.body.id);
                                                        });
    }
    else if(req.body.type == "book"){
      model = bookModel;
    }
    else if(req.body.type == "paper"){
      model = paperModel;
    }
  }
};
