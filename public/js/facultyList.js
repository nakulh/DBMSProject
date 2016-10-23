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
  $.get("/facultyList", function(data) {
    console.log(data);
    userData = data;
    fuse = new Fuse(data.faculties, options);
    var faculties = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Status</th><th>Type</th></tr>";
    for(var x = 0; x < data.faculties.length; x++){
      faculties += "<tr><td> <a href='/faculty/id/" + data.faculties[x]._id.toString() + "'>" + data.faculties[x].name + "</a></td><td>" + data.faculties[x].status + "</td><td>" + data.faculties[x].type + "</td></tr>";
    }
    faculties += "</table>";
    allData = faculties;
    console.log(faculties);
    $('#facultiesTable').html(faculties);
  });
});
$('.facultyForm').on('input', function() {
  console.log("changed");
  var resultFaculty = fuse.search($(".facultyForm").val());
  var faculties = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Education</th><th>Status</th><th>Type</th></tr>";
  for(var x = 0; x < resultFaculty.length; x++){
    faculties += "<tr><td> <a href='/faculty/id/" + resultFaculty[x]._id.toString() + "'>" + resultFaculty[x].name + "</a></td><td>"+ resultFaculty[x].education + "</td><td>" + resultFaculty[x].status + "</td><td>" + resultFaculty[x].type + "</td></tr>";
  }
  faculties += "</table>";
  console.log(faculties);
  if($(".facultyForm").val() === ""){
    $('#facultiesTable').html(allData);
  }
  else{
    $('#facultiesTable').html(faculties);
  }
});
