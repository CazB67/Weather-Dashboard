# Weather-Dashboard
Assignment 6

## Description
The purpose of this assignment is to create a weather application for a traveller so that they can access the weather for multiple cities and use this information to plan their trip. The development of this application required the following criteria:
* A  weather dashboard with form inputs
* The ability to search for a city and be presented with current and future conditions for that city and that city to be added to the search history
* The current weather conditions that need to be included are city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
* The UV index needs to be colour coded to indicate whether the conditions are favorable, moderate, or severe
* Future weather conditions for that city are presented as a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
* When a city in the search history is clicked the user is presented with current and future conditions for that city

## Installation
To install this project the Open Weather API was used to gather the up to date and relevant weather information and icons. The date was set using moment.js. Javascript and JQuery were used to create HTML and add info. Ajax calls were used to retrieve info from the Weather API.


## Usage
This has been deployed to the URLs 

* The URL of the deployed application is https://cazb67.github.io/weather-dashboard/

* The URL of the GitHub repository is https://github.com/CazB67/weather-dashboard

![Weather Dashboard](Capture.PNG)

The application appears as above. Type in city name in input box then click search button. City weather information appears on the right hand side. When the city has been searched it appears as a list below the input box. Any of the cities listed can be clicked and their relevant city weather information will appear on the right side of the browser. When the delete button is clicked, the list of city names is removed. 


## Credits
* Team at UWA Coding Bootcamp
* Moment.js - https://momentjs.com/
* Bootstrap - https://getbootstrap.com/
* Font Awesome - https://fontawesome.com/
* UV Index info - http://www.bom.gov.au/uv/
* OpenWeather API - https://openweathermap.org/api


## License
MIT License

Copyright (c) [2020] [Caroline Bates]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

