var gFaculty = {};
$(document).ready(function(){
  $.post('/editFacultyInfo', {
    id: window.location.pathname.split("/")[2]
  }, function(faculty){
    gFaculty = faculty;
    $("#name").val(faculty.name);
    $("#status").val(faculty.status);
    $("#type").val(faculty.type);
    //$("#email").val(student.email);
    //$("#mobile").val(student.mobile);
    //$("#bioId").val(student.bioId);
    //$("#dateOfJoin").val(student.dateOfJoin);
    $("#comment").val(faculty.comment);
    //$("#entrance").val(student.entrance);
    //$("#phdAwarded").val(student.phdAwarded);
    //$("#dateOfBirth").val(student.dateOfBirth);
    $("#education").val(faculty.education);
    console.log(faculty);
  });
});
var editor = function(){
  gFaculty.name = $("#name").val();
  gFaculty.status = $("#status").val();
  gFaculty.type = $("#type").val();
  //gStudent.email = $("#email").val();
  //gStudent.mobile = $("#mobile").val();
  //gStudent.bioId = $("#bioId").val();
  gFaculty.comment = $("#comment").val();
  gFaculty.education = $("#education").val();
  console.log(gFaculty);
  $.post('/saveInfo', {
    id: window.location.pathname.split("/")[2],
    type: window.location.pathname.split("/")[1],
    entity: gFaculty
  }, function(){
    console.log("posted");
    window.location.href = window.location.pathname.split("/")[0] + "/" + window.location.pathname.split("/")[1] + "/id/" + window.location.pathname.split("/")[2];
  });
};
