
var cityListArray =[];

$(document).ready(function() {
  
  loadSavedCities();
  
  function loadSavedCities(){
    var storedCitiesLocalStorage = JSON.parse(localStorage.getItem("cities"));
    // If cities were retrieved from localStorage, update the cityListArray array to it
    if (storedCitiesLocalStorage !== null) {
      cityListArray = storedCitiesLocalStorage;
   
      if(cityListArray.length === 0 ){
       getWeatherData("Perth");
        getForecast("Perth");
      }else {
        renderCities();
        getWeatherData(cityListArray[0]);
        getForecast(cityListArray[0]);
      }
    } else {
      getWeatherData("Perth");
      getForecast("Perth");
    }
    
  }

  function saveCities(){
    localStorage.setItem("cities", JSON.stringify(cityListArray));

  }

  function renderCities(){
    $("#cityList").empty();
    for (var i=0; i < cityListArray.length; i++){

      var cityDiv = $("<div>").addClass("list-group-item list-group-item-action cityDiv");
       $(cityDiv).text(cityListArray[i]);
       
      //Event handler for city search history list
      $(cityDiv).on("click", function(){
        var listObject = $(this);
        console.log(this);
        getWeatherData(listObject[0].innerText);
        getForecast(listObject[0].innerText);
      });
      
        $("#cityList").append(cityDiv);
        var deleteIcon = $("<i>").addClass("far fa-times-circle pt-2 float-right");
        $(deleteIcon).data("row", i);
        $(cityDiv).append(deleteIcon);
        $(deleteIcon).on("click", function(){
        console.log($(this).data("row"));
        var deleteRow = $(this).data("row");
        cityListArray.splice(deleteRow, 1);
        saveCities();
        renderCities();
      });

      

    }
  }

  function capitaliseCityName (str) {
    var result = [];
  
    var words = str.split(" ");
  
    for (var i = 0; i < words.length; i++) {
      var word = words[i].split("");
  
      word[0] = word[0].toUpperCase();
  
      result.push(word.join(""));
    }
  
    return result.join(" ");
  };


  function getWeatherData(cityName){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=93a1b36ce896ae47aacbda156624ac6a";
 
    $.ajax({
        url: queryURL,
        method: 'GET',
        success: function(response){
            currentWeather(response, cityName);
            savedList(cityName);
        },
        error: function(){


        }})  
        .done(function(response){
    
    });
  };


  function getUVData(lattitude, longitude) {

   var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=93a1b36ce896ae47aacbda156624ac6a&lat=" + lattitude + "&lon=" + longitude;
 
    $.ajax({
        url: queryURL,
        method: 'GET',
        success: function(response){
          uvIndex(response);

        },
        error: function(){


        }})  
        .done(function(response){
    
    });

  };

  function getForecast(cityName) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=93a1b36ce896ae47aacbda156624ac6a";
  
     $.ajax({
         url: queryURL,
         method: 'GET',
         success: function(response){
           fiveDayForecast(response);
 
         },
         error: function(){
 
 
         }})  
         .done(function(response){
     
     });
 
   };

  function currentWeather(response, cityName){

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
     var cityInfo = $("#city-info");
     cityInfo.empty();
     cityInfo.append(temperature, humidity, windSpeed);
     getUVData(response.coord.lat, response.coord.lon);
     //uvIndex(response);
  }


    // Event handler for user clicking the city button
    $("#city-name").on("keypress", function(e) {
      if(e.which === 13){
        var cityName = capitaliseCityName($("#city-name").val().trim());
        
        getWeatherData(cityName);
        getForecast(cityName);
      }  
    })

    $("#search").on("click", function() {
      var cityName = capitaliseCityName($("#city-name").val().trim());
      
      getWeatherData(cityName);
      getForecast(cityName);
    })

    function savedList(cityName){
      //Creating variable to store saved cities
      var foundDuplicate = 0;
      for(var i=0; i< cityListArray.length; i++) {
        console.log(cityListArray[i]);
        if(cityName.toUpperCase() === cityListArray[i].toUpperCase()){
          console.log("Found A Duplicate");
          foundDuplicate = 1;
        }
      }
      if (foundDuplicate === 0) {
        cityListArray.push(cityName); 
      }
        saveCities();  
        renderCities();
      
    }

    function uvIndex(response) {
        
        var uvIndex = $("<p>");
        $(uvIndex).text("UV Index: ").addClass("mb-5");
        var span =$("<span>");
        $(span).text(response.value);
        var cityInfo = $("#city-info");
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
    
    }

    function fiveDayForecast(response) {
      $(".forecastCard").empty()
      //Looping through info in object to dynamically add cards and info
      for(var i=1; i<= 5; i++) {
        
        var cardDiv = $("<div>").addClass("card shadow-lg text-white bg-primary mb-3 p-2 mr-3");
        $(cardDiv).attr("style", "width:9rem");
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
    }

})