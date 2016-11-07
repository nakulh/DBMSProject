var gStudent = {};
$(document).ready(function(){
  $.post('/editJrfInfo', {
    id: window.location.pathname.split("/")[2]
  }, function(student){
    gStudent = student;
    $("#name").val(student.name);
    $("#admnNo").val(student.admnNo);
    $("#status").val(student.status);
    $("#type").val(student.type);
    $("#duration").val(student.duration);
    $("#thesisStatus").val(student.thesisStatus);
    $("#email").val(student.email);
    $("#mobile").val(student.mobile);
    $("#bioId").val(student.bioId);
    //$("#dateOfJoin").val(student.dateOfJoin);
    $("#comment").val(student.comment);
    $("#entrance").val(student.entrance);
    $("#phdAwarded").val(student.phdAwarded);
    //$("#dateOfBirth").val(student.dateOfBirth);
    $("#education").val(student.education);
    console.log(student);
  });
});
var editor = function(){
  gStudent.name = $("#name").val();
  gStudent.admnNo = $("#admnNo").val();
  gStudent.status = $("#status").val();
  gStudent.duration = $("#duration").val();
  gStudent.type = $("#type").val();
  gStudent.thesisStatus = $("#thesisStatus").val();
  gStudent.email = $("#email").val();
  gStudent.mobile = $("#mobile").val();
  gStudent.bioId = $("#bioId").val();
  gStudent.comment = $("#comment").val();
  gStudent.entrance = $("#entrance").val();
  gStudent.phdAwarded = $("#phdAwarded").val();
  gStudent.education = $("#education").val();
  console.log(gStudent);
  $.post('/saveInfo', {
    id: window.location.pathname.split("/")[2],
    type: window.location.pathname.split("/")[1],
    entity: gStudent
  }, function(){
    console.log("posted");
    window.location.href = window.location.pathname.split("/")[0] + "/" + window.location.pathname.split("/")[1] + "/id/" + window.location.pathname.split("/")[2];
  });
};
