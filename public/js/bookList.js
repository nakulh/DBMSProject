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
  $.get("/bookList", function(data) {
    console.log(data);
    userData = data;
    fuse = new Fuse(data.books, options);
    var books = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Description</th></tr>";
    for(var x = 0; x < data.books.length; x++){
      books += "<tr><td> <a href='/book/id/" + data.books[x]._id.toString() + "'>" + data.books[x].title + "</a></td><td>" + data.books[x].description + "</td></tr>";
    }
    books += "</table>";
    allData = books;
    console.log(books);
    $('#booksTable').html(books);
  });
});
$('.bookForm').on('input', function() {
  console.log("changed");
  var resultBooks = fuse.search($(".bookForm").val());
  var books = "<table style='width:100%'' class='table table-hover'><tr><th>Name</th><th>Description</th></tr>";
  for(var x = 0; x < resultBooks.length; x++){
    books += "<tr><td> <a href='/book/id/" + resultBooks[x]._id.toString() + "'>" + resultBooks[x].title + "</a></td><td>" + resultBooks[x].description + "</td></tr>";
  }
  books += "</table>";
  console.log(books);
  if($(".bookForm").val() === ""){
    $('#booksTable').html(allData);
  }
  else{
    $('#booksTable').html(books);
  }
});
