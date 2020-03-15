$( document ).ready( searchCity("Perth") );

function searchCity(cityName) {

  var APIKey = "appid=93a1b36ce896ae47aacbda156624ac6a";
// Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&" + APIKey;
  console.log(queryURL);
  var cityInfo = $("#city-info");
  cityInfo.empty();

  // Storing the city name
  
  date = moment().format("DD-MM-YYYY");
  $("#cityHeading").text(cityName + " " + "(" + date + ")");

    // Creating an AJAX call for the specific city being input
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
        console.log(response.coord.lon);
        console.log(response.coord.lat);
        console.log(response.weather[0].main);
        
        
        
        var temperature = $("<p>").text("Temperature: " + response.main.temp + " \xB0C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/h");
        
        cityInfo.append(temperature, humidity, windSpeed);

        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        console.log("https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon);

       
    $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        
        console.log(response);
        var uvIndex = $("<p>").text("UV Index: " +  response.value);
        cityInfo.append(uvIndex);

  
      });
    
    
    });


}
    // Event handler for user clicking the select-artist button
  $("#search").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    
    var inputCity = $("#city-name").val().trim();
    var cityDiv = $("<div>").addClass("list-group-item list-group-item-action");
    $(cityDiv).text(inputCity);
    $("#cityList").append(cityDiv);
    var uniqueLi = {};

    $("#cityList .list-group-item").each(function () {
      var thisVal = $(this).text();
      if ( (thisVal in uniqueLi) ) {
        $(this).remove();
      } else {
        uniqueLi[thisVal]="";
      }
    })

    searchCity(inputCity);
    
});
