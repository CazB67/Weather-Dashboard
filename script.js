function searchCity(cityName) {
var APIKey = "&appid=93a1b36ce896ae47aacbda156624ac6a";

// Here we are building the URL we need to query the database
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIKey;
console.log("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIKey);
    

    // Creating an AJAX call for the specific city being input
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

    });

}
    // Event handler for user clicking the select-artist button
  $("#search").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputCity = $("#city-name").val().trim();
    $("#cityHeading").text(inputCity);

    searchCity(inputCity);
    
});