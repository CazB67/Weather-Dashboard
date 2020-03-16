$( document ).ready( searchCity("Perth"));

function searchCity(cityName) {

  var APIKey = "appid=93a1b36ce896ae47aacbda156624ac6a";
// Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&" + APIKey;
  console.log(queryURL);
  var cityInfo = $("#city-info");
  cityInfo.empty();

  // Storing the city name
  
  

    // Creating an AJAX call for the specific city being input
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
        console.log(response.coord.lon);
        console.log(response.coord.lat);
        console.log(response.weather[0].main);
        
        var iconCode = (response.weather[0].icon);
        var queryURL3 = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var date = moment().format("DD-MM-YYYY");
        
        
        var weatherIcon = $("<img>").attr("src", queryURL3);
        $("#cityHeading").text(cityName + " " + "(" + date + ")");
        $("#cityHeading").append(weatherIcon);
        console.log(weatherIcon);
        
        
        var temperature = $("<p>").text("Temperature: " + response.main.temp + " \xB0C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/h");
        
        cityInfo.append(temperature, humidity, windSpeed);

        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        console.log("https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        console.log(response);
       
       $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        
        console.log(response.value);
        var uvIndex = $("<p>");
        $(uvIndex).text("UV Index: ");
        var span =$("<span>");
        $(span).text(response.value);

        $(cityInfo).append(uvIndex);
        $(uvIndex).append(span);

        if((response.value) < 3) {
          $(span).text(response.value + " - LOW");
         $(span).addClass("uvLow");

        }else if ((response.value) >= 3 && (response.value) < 6 ) {
          $(span).text(response.value + " - MODERATE");
          $(span).addClass("uvModerate");
        }else if ((response.value) >= 6 && (response.value) < 8 ) {
          $(span).text(response.value + " - HIGH");
          $(span).addClass("uvHigh");
        }else if ((response.value) >= 8 && (response.value) < 11 ) {
          $(span).text(response.value + " - VERY HIGH");
          $(span).addClass("uvVeryHigh");
        }else{
          $(span).text(response.value + " - EXTREME");
          $(span).addClass("uvExtreme");
        }

      });
    
    
    });

    var queryURL4 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&" + APIKey;
    console.log(queryURL4);

    $.ajax({
      url: queryURL4,
      method: "GET"
    }).then(function(response) {

        console.log(response);
        $(".forecastCard").empty()
    //  console.log(response.list[7].main.temp);
      for(var i=1; i<= 5; i++) {
        
        var cardDiv = $("<div>").addClass("card shadow-lg text-white bg-primary mx-auto mb-5 p-2 mr-1");
        $(cardDiv).attr("style", "width:9rem; height:13rem");
        $(".forecastCard").append(cardDiv);
        var dateHeading = $("<h5>");
        var tempDiv = $("<div>");
        var humidityDiv = $("<div>");
        
        
        
        $(dateHeading).text(( moment().add(i, "days").format("DD-MM-YYYY")));
        $(cardDiv).append(dateHeading);
        console.log(response.list[i*7].weather[0].icon);
        var iconCode2 = response.list[i*7].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/wn/" + iconCode2 + "@2x.png";
        var imageDiv = $("<img>").attr("src", forecastIconURL);
        $(imageDiv).text(iconCode2);
        $(cardDiv).append(imageDiv);
        $(tempDiv).text("Temp: "  + response.list[i*7].main.temp + " \xB0C");
        $(cardDiv).append(tempDiv);
        $(humidityDiv).text("Humidity: "  + response.list[i*7].main.humidity + " %");
        $(cardDiv).append(humidityDiv);
      }




    });

}
    // Event handler for user clicking the select-artist button
  $("#search").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    
    var inputCity = $("#city-name").val().trim();
    var cityDiv = $("<div>").addClass("list-group-item list-group-item-action");
    $(cityDiv).text(inputCity);
    $(cityDiv).on("click", function(){
      var listObject = $(this);
      searchCity(listObject[0].innerText);
    });


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
