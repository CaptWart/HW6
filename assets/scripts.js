//api - 2bfac481a9f992bf81be707c9df9b308
// https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=2bfac481a9f992bf81be707c9df9b308
var queryURL="https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=2bfac481a9f992bf81be707c9df9b308";
var five="https://api.openweathermap.org/data/2.5/forecast?q=orlando,us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"
//get current weather
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
  //get 5 day forcast
  $.ajax({
    url: five,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  function convertKalvin(temp){

  }