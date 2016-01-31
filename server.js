var express = require('express');
var app = express();
var moment = require('moment');
var dateObj = {unix: 0, natural: "string"};
var port = process.env.PORT || 8080;
function convertNatural(date){
    dateObj.unix = date;
    date = date*1000;
    date = new Date(date);
    var newDate = moment(date).format("MMMM D, YYYY");
    dateObj.natural = newDate;
    
}
function convertUnix(date){
    date = new Date(date);
    if(date != "Invalid Date"){
    dateObj.natural = moment(date).format("MMMM D, YYYY");
    }else{
        dateObj.natural = null;
    }
    var newDate = moment(date).format("x");
    newDate = newDate/1000;
    dateObj.unix = newDate;
    
}
app.get('/:query', function(req, res) {
  var date = req.params.query;
    if(/[a-z]/i.test(date)){
        convertUnix(date);
    }else{
      convertNatural(date);
    }
  var final = JSON.stringify(dateObj);
  var html = "<p>" + final + "</p>";
  res.end(html);
  });
app.listen(port);