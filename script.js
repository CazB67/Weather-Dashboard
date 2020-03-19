var cityListArray =[];
//Set default city
$(document).ready(function() {
  var storedCitiesLocalStorage = JSON.parse(localStorage.getItem("cities"));

  // If cities were retrieved from localStorage, update the cityListArray array to it
  if (storedCitiesLocalStorage !== null) {
    cityListArray = storedCitiesLocalStorage;
  }

  console.log(cityListArray);
  for (var i=0; i < cityListArray.length; i++){
      var cityDiv = $("<div>").addClass("list-group-item list-group-item-action");
       $(cityDiv).text(cityListArray[i]);
  
      //Event handler for city search history list
      $(cityDiv).on("click", function(){
        var listObject = $(this);
        console.log(listObject);
        searchCity(listObject[0].innerText);
      });
  
      $("#cityList").append(cityDiv);
    }
    if(cityListArray.length !== 0 ){
    searchCity(cityListArray[0]);
    }else{
      searchCity("Perth");
    }
});
function searchCity(cityName) {
  
  if(cityName === ""){
    console.log("empty string");
    return;
  }


  var APIKey = "appid=93a1b36ce896ae47aacbda156624ac6a";

  // Here we are building the URL we need to query the database for city current weather
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&" + APIKey;
  //console.log(queryURL);
  var cityInfo = $("#city-info");
  cityInfo.empty();

    // Creating an AJAX call for the specific city being input to get icons, temp, humidity and wind speed
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
        
        // Here we are building the URL we need to query the database for weather icons
        var iconCode = (response.weather[0].icon);
        var queryWeatherIconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

        //Variable to set the date
        var date = moment().format("DD-MM-YYYY");
        
        //Creating HTML for heading and adding date and icon
        var weatherIcon = $("<img>").attr("src", queryWeatherIconURL);
        $("#cityHeading").text(cityName + " " + "(" + date + ")");
        $("#cityHeading").append(weatherIcon);
        
        //Creating HTML for response weather info
        var temperature = $("<p>").text("Temperature: " + response.main.temp + " \xB0C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/h");
        cityInfo.append(temperature, humidity, windSpeed);

        //Building the URL for UV index info
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon
       
      // Ajax call for uv index info
       $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        
        var uvIndex = $("<p>");
        $(uvIndex).text("UV Index: ").addClass("mb-5");
        var span =$("<span>");
        $(span).text(response.value);

        $(cityInfo).append(uvIndex);
        $(uvIndex).append(span);


        //Adding classes to UV index so that they are colour coded depending on levels
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


    //Building URL for weather forecast
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&" + APIKey;
  

    $.ajax({
      url: queryURLForecast,
      method: "GET"
    }).then(function(response) {

        //Empty forecast cards div before adding new ones
        $(".forecastCard").empty()
   
      //Looping through info in object to dynamically add cards and info
      for(var i=1; i<= 5; i++) {
        
        var cardDiv = $("<div>").addClass("card shadow-lg text-white bg-primary mb-3 p-2 mr-3");
        $(cardDiv).attr("style", "width:9rem; height:13rem");
        $(".forecastCard").append(cardDiv);

        var dateHeading = $("<h5>");
        $(dateHeading).text(( moment().add(i, "days").format("DD-MM-YYYY")));
        $(cardDiv).append(dateHeading);

        var iconCode2 = response.list[i*7].weather[0].icon;
        var forecastIconURL = "https://openweathermap.org/img/wn/" + iconCode2 + "@2x.png";
        var imageDiv = $("<img>").attr("src", forecastIconURL);
        $(imageDiv).text(iconCode2);
        $(cardDiv).append(imageDiv);

        var tempDiv = $("<div>");
        $(tempDiv).text("Temp: "  + response.list[i*7].main.temp + " \xB0C");
        $(cardDiv).append(tempDiv);

        var humidityDiv = $("<div>");
        $(humidityDiv).text("Humidity: "  + response.list[i*7].main.humidity + " %");
        $(cardDiv).append(humidityDiv);
         
      }

    });

}
    // Event handler for user clicking the city button
    $("#search").on("click", function(event) {
    
        var inputCity = $("#city-name").val().trim();

        if(inputCity === ""){
          console.log("empty string 2");
          return;
        }

        //Clear input box after clicking search icon
        $('input[type="text"], textarea').val('');
        //DIV for city search history list to go
        var cityDiv = $("<div>").addClass("list-group-item list-group-item-action");
        $(cityDiv).text(inputCity);

        //Event handler for city search history list
        $(cityDiv).on("click", function(){
        var listObject = $(this);
        console.log(listObject);

        searchCity(listObject[0].innerText);
        
        });

        //Making sure cities only appear once in search history. 
        $("#cityList").append(cityDiv);

        //Google fu I don't completely understand
        var uniqueLi = [];
        $("#cityList .list-group-item").each(function () {
        var thisVal = $(this).text();
        if ( (thisVal in uniqueLi) ) {
        $(this).remove();
        } else {
        uniqueLi[thisVal]="";
        }
    })

    cityListArray.length=0;
    $("#cityList .list-group-item").each(function () {
      var thisVal = $(this).text();
      cityListArray.push(thisVal);
     })
    
     localStorage.setItem("cities", JSON.stringify(cityListArray));


    //Call searchCity() so it can read inputCity
    searchCity(inputCity);
    
});

//Delete button to clear stored city list
$("#delete").on("click", function(){
  cityListArray.length = 0;
  localStorage.setItem("cities", JSON.stringify(cityListArray));
  window.location = "index.html";
  });