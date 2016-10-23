$('.alert-success').hide();
$('.alert-danger').hide();

var fuseFaculty, fuseStudent;

$('#profile a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});
$('#relatives a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});
$('#books a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});
$('#papers a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});
var userData = {};
$(document).ready(function(){
  $.get("/list", function(data) {
    console.log(data);
    userData = data;
    /*
    var students = "<table class='table'><tr><th>Name</th><th>Add</th></tr>";
    for(var x = 0; x < data.students.length; x++){
      students += "<tr><td> <a href='/jrfStudent/id/" + data.students[x].id.toString() + "'>" + data.students[x].name + "</a></td><td><button onclick=\"addRelative('" + data.students[x].id.toString() + "', 'student')\" type='button' class='btn btn-default'>Add</button></td></tr>";
    }
    students += "</table>";
    console.log(students);
    $('#addRelativeStudentsTable').html(students);
    var faculties = "<table class='table'><tr><th>Name</th><th>Add</th></tr>";
    for(x = 0; x < data.faculties.length; x++){
      faculties += "<tr><td> <a href='/faculty/id/" + data.faculties[x].id.toString() + "'>" + data.faculties[x].name + "</a></td><td><button onclick=\"addRelative('" + data.faculties[x].id.toString() + "', 'faculty')\" type='button' class='btn btn-default'>Add</button></td></tr>";
    }
    faculties += "</table>";
    console.log(faculties);
    $('#addRelativeStudentsTable').html(students);
    $('#addRelativeFacultiesTable').html(faculties);
    */
    fuseFaculty = new Fuse(data.faculties, options);
    fuseStudent = new Fuse(data.students, options);
  });
});

var addRelative = function(id, type){
  var sourceId = window.location.pathname.split("/").pop();
  var sourceType = window.location.pathname.split("/")[1];
  console.log(sourceType);
  console.log(sourceId);
  $.post("/addInsideAuthor", {
    sourceId: sourceId,
    sourceType: sourceType,
    desId: id,
    desType: type
  }, function(res){
    console.log("related");
    console.log(res);
    if(res.error){
      showError(res.error);
    }
    else{
      showSuccess(res.done);
    }
  });
};

var showError = function(error){
  $('.alert-danger').html("<a class='alert-link'>" + error + "</a>");
  $('.alert-danger').show(1000);
};
var showSuccess = function(success){
  $('.alert-success').html("<a class='alert-link'>" + success + "</a>");
  $('.alert-success').show(1000);
};

var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  keys: [
    "name"
  ]
};
$('.facultyForm').on('input', function() {
  console.log("changed");
  var resultFaculty = fuseFaculty.search($(".facultyForm").val());
  //console.log(resultFaculty);
  var faculties = "<table class='table'><tr><th>Name</th><th>Add</th></tr>";
  for(x = 0; x < resultFaculty.length; x++){
    faculties += "<tr><td> <a href='/faculty/id/" + resultFaculty[x].id.toString() + "'>" + resultFaculty[x].name + "</a></td><td><button onclick=\"addRelative('" + resultFaculty[x].id.toString() + "', 'faculty')\" type='button' class='btn btn-default'>Add</button></td></tr>";
  }
  faculties += "</table>";
  //console.log(faculties);
  $('#addRelativeFacultiesTable').html(faculties);
});
$('.studentForm').on('input', function() {
  console.log("changed");
  var resultStudent = fuseStudent.search($(".studentForm").val());
  //console.log(resultStudent);
  var students = "<table class='table'><tr><th>Name</th><th>Add</th></tr>";
  for(var x = 0; x < resultStudent.length; x++){
    students += "<tr><td> <a href='/jrfStudent/id/" + resultStudent[x].id.toString() + "'>" + resultStudent[x].name + "</a></td><td><button onclick=\"addRelative('" + resultStudent[x].id.toString() + "', 'student')\" type='button' class='btn btn-default'>Add</button></td></tr>";
  }
  students += "</table>";
  //console.log(students);
  $('#addRelativeStudentsTable').html(students);
});
