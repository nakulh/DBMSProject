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
    "title"
  ]
};
$(document).ready(function(){
  $.get("/paperList", function(data) {
    console.log(data);
    userData = data;
    fuse = new Fuse(data.papers, options);
    var papers = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Description</th></tr>";
    for(var x = 0; x < data.papers.length; x++){
      papers += "<tr><td> <a href='/paper/id/" + data.papers[x]._id.toString() + "'>" + data.papers[x].title + "</a></td><td>" + data.papers[x].description + "</td></tr>";
    }
    papers += "</table>";
    allData = papers;
    console.log(papers);
    $('#papersTable').html(papers);
  });
});
$('.paperForm').on('input', function() {
  console.log("changed");
  var resultPapers = fuse.search($(".paperForm").val());
  var papers = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Description</th></tr>";
  for(var x = 0; x < resultPapers.length; x++){
    papers += "<tr><td> <a href='/paper/id/" + resultPapers[x]._id.toString() + "'>" + resultPapers[x].title + "</a></td><td>" + resultPapers[x].description + "</td></tr>";
  }
  papers += "</table>";
  console.log(papers);
  if($(".paperForm").val() === ""){
    $('#papersTable').html(allData);
  }
  else{
    $('#papersTable').html(papers);
  }
});
