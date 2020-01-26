//api - 2bfac481a9f992bf81be707c9df9b308

var testApi="https://api.openweathermap.org/data/2.5/forecast?q=orlando,us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"
var test1Api="https://api.openweathermap.org/data/2.5/weather?q=orlando,us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"
var userCity;
var userCity5Search="https://api.openweathermap.org/data/2.5/forecast?q="+userCity+",us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"
var userCity1Search="https://api.openweathermap.org/data/2.5/weather?q="+userCity+",us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"
var lon=-81.38
var lat= 28.54
var uvCity="https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=2bfac481a9f992bf81be707c9df9b308"


//get current weather
  //get 5 day forcast
  $.ajax({
    url: test1Api,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.weather[0].icon);

    console.log(response.name);
    console.log("temp "+convertKalvin(response.main.temp));
    console.log(moment().format('ll'));
    console.log("humidity "+response.main.humidity);
    console.log("wind "+response.wind.speed);
  });

$.ajax({
    url: testApi,
    method: "GET"
  }).then(function(response) {
    //console.log(response.list);
    Object.entries(response.list).forEach(function(item){
        var midDay = item[1].dt_txt.substring(11);
        if(midDay == "12:00:00"){
            //gets day
            console.log(item[1].dt_txt);
            //gets temp
            console.log("temp "+convertKalvin(item[1].main.temp));
            //gets humidity
            console.log("humidity "+item[1].main.humidity);
            //gets icon
            console.log(item[1].weather[0].icon);
        }
    })
  });

$.ajax({
    url: uvCity,
    method: "GET"
  }).then(function(response) {
      //uv index
    console.log("uv "+response.value);
    

  });

  function convertKalvin(temp){
    var f = (temp * 9/5 - 459.67);
    return Math.round(f);
  }

  function createFiveDay(){

  }

  function createSearchHistory(){

  }

  function getCurrentWeather(response){
    
  }

  function getUv(){

  }