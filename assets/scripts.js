
populatePage()
populateHistory()

$("#searchBtn").on("click", function(){
  var input = $("#userCity").val();
  getCurrentWeather(input);
  createFiveDay(input);
  createSearchHistory(input);
});

function createFiveDay(response){
  var userCity;
  userCity = response;
  var userCity5Search="https://api.openweathermap.org/data/2.5/forecast?q="+userCity+",us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"

  $.ajax({
    url: userCity5Search,
    method: "GET"
  }).then(function(citySelector) {
    $("#fiveDayDiv").remove();
    $("#fiveDay").append("<div id='fiveDayDiv'><h3>5-Day Forcast</h3></div>")
    Object.entries(citySelector.list).forEach(function(item){
        var midDay = item[1].dt_txt.substring(11);
        var imgIcon = item[1].weather[0].icon;
        if(midDay == "12:00:00"){
          var dates = new Date(item[1].dt_txt)
            $("#fiveDayDiv").append("<div class='float-left fiveDayBox'>"+ dates.toLocaleDateString('en-US')
            + "<img height='50' width='50' src=http://openweathermap.org/img/wn/"+imgIcon+"@2x.png>"
            + " Temp: "+convertKalvin(item[1].main.temp)+"°F Humidity: "+item[1].main.humidity+ "%</div>")
        }
    })
  });
}

function createSearchHistory(city){
      var history = localStorage.getItem("cities");
      if (history == null){
        localStorage.setItem("cities", city);
      }
      else{
        history = history+","+city;
        localStorage.setItem("cities", history);
      }
      populateHistory()
}

function getCurrentWeather(response){
  var userCity;
  userCity = response;
  var userCity1Search="https://api.openweathermap.org/data/2.5/weather?q="+userCity+",us&mode=json&appid=2bfac481a9f992bf81be707c9df9b308"

  $.ajax({
    url: userCity1Search,
    method: "GET"
  }).then(function(citySelector) {
    var imgIcon = citySelector.weather[0].icon;
    $("#currentWeather").remove();
    getUv(citySelector);
    $("#currentCity").append("<div id='currentWeather'></div?")
    $("#currentWeather").append("<h3>"+citySelector.name+" "+moment().format('ll')+
    "<img src=http://openweathermap.org/img/wn/"+imgIcon+"@2x.png></h3>");
    $("#currentWeather").append("<p> Temperature: "+convertKalvin(citySelector.main.temp)+"°F</p>");
    $("#currentWeather").append("<p>Humidity: "+citySelector.main.humidity+"%</p>");
    $("#currentWeather").append("<p>Wind speed: "+citySelector.wind.speed+"MPH</p>");

  });
}

function getUv(city){
  var lon = city.coord.lon;
  var lat= city.coord.lat;
  var uvCity="https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=2bfac481a9f992bf81be707c9df9b308"
  $.ajax({
    url: uvCity,
    method: "GET"

  }).then(function(response) {
    $("#currentWeather").append("<p>UV Index: "+response.value+"</p>");

  });
}

function convertKalvin(temp){
  var f = (temp * 9/5 - 459.67);
  return Math.round(f);
}

function populateHistory(){
  var history = localStorage.getItem("cities");
  if (history == null){
    return;
  }
  else{
    $("tr").remove();
    array = history.split(",");
    allCities = array.filter((a, b) => array.indexOf(a) === b);
    $("#history").append("<tr></tr>")
    allCities.forEach(function(city){
      $("tr").append("<ul>"+city+"</ul>")
    });
    localStorage.setItem("cities", history);
    $("#history").append("<tr></tr>")
  }
}

$(document).on("click","ul", function(event){
  var input = this.innerText;
  getCurrentWeather(input);
  createFiveDay(input);
  createSearchHistory(input);
});

function populatePage(){
  var history = localStorage.getItem("cities");
  if (history == null){
    return;
  }
  else{
    array = history.split(",");
    allCities = array.filter((a, b) => array.indexOf(a) === b);
    var lastCity = allCities[allCities.length - 1];
    getCurrentWeather(lastCity);
    createFiveDay(lastCity);
  }
}
