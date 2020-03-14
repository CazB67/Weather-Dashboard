

function searchCity(cityName) {
var APIKey = "appid=93a1b36ce896ae47aacbda156624ac6a";


// Here we are building the URL we need to query the database
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&" + APIKey;


console.log(queryURL);
var cityInfo = $("#city-info");
cityInfo.empty();




    

    // Creating an AJAX call for the specific city being input
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
        console.log(response.coord.lon);
        console.log(response.coord.lat);
        var temperature = $("<p>").text("Temperature: " + response.main.temp + " \xB0C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/h");
        
        cityInfo.append(temperature, humidity, windSpeed);

        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        console.log("http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon);

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
    // Storing the artist name
    var inputCity = $("#city-name").val().trim();
    date = moment().format("DD-MM-YYYY");
    $("#cityHeading").text(inputCity + " " + "(" + date + ")");
    
    

    searchCity(inputCity);
    
});