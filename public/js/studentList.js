var fuse;
var userData = {};
var allData = "";
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
$(document).ready(function(){
  $.get("/jrfStudentList", function(data) {
    console.log(data);
    userData = data;
    fuse = new Fuse(data.students, options);
    var students = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Education</th><th>Status</th><th>Type</th></tr>";
    for(var x = 0; x < data.students.length; x++){
      students += "<tr><td> <a href='/jrfStudent/id/" + data.students[x]._id.toString() + "'>" + data.students[x].name + "</a></td><td>"+ data.students[x].education + "</td><td>" + data.students[x].status + "</td><td>" + data.students[x].type + "</td></tr>";
    }
    students += "</table>";
    allData = students;
    console.log(students);
    $('#studentsTable').html(students);
  });
});
$('.studentForm').on('input', function() {
  console.log("changed");
  var resultStudent = fuse.search($(".studentForm").val());
  //console.log(resultStudent);
  var students = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Education</th><th>Status</th><th>Type</th></tr>";
  for(var x = 0; x < resultStudent.length; x++){
    students += "<tr><td> <a href='/jrfStudent/id/" + resultStudent[x]._id.toString() + "'>" + resultStudent[x].name + "</a></td><td>"+ resultStudent[x].education + "</td><td>" + resultStudent[x].status + "</td><td>" + resultStudent[x].type + "</td></tr>";
  }
  students += "</table>";
  console.log(students);
  if($(".studentForm").val() === ""){
    $('#studentsTable').html(allData);
  }
  else{
    $('#studentsTable').html(students);
  }
});
