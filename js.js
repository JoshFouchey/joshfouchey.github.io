function pageSetup(){
  updateClock();
  getLocation();
}
function updateClock()
{
        Date.getMinutesTwoDigits = function()
        {
                var retval = now.getMinutes();
                if (retval < 10) return ("0" + retval.toString());
                else return retval.toString();
        }
        Date.getHoursModTwelve = function()
        {
                var retval = now.getHours();
                retval = retval%12;
                if (retval == 0) retval = 12;
                return retval;
        }
        var now = new Date(),
        time = Date.getHoursModTwelve() + ':' + Date.getMinutesTwoDigits();
        document.getElementById('time').innerHTML = ["", time].join('');
        setTimeout(updateClock, 1000);
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  var lati = position.coords.latitude;
  var longi =position.coords.longitude;
  updateWeather(lati,longi);
}

function updateWeather(lati, longi){
  var x = '7510998e34b56c2c3edab3e014703562';
  var url = 'https://api.forecast.io/forecast/';
  var data;

  $.getJSON(url + x + "/" + lati + "," + longi + "?callback=?", function(data) {
    //console.log(data);
    $('#weather').html(data.currently.summary +' ' + data.currently.temperature + '&deg;');
      $('#windSpeed').html('Wind Speed:' + data.currently.windSpeed);
    if(data.currently.icon === "partly-cloudy-night"){
        $('#cloudContainer').css("display", "block");
        $('#cloudContainer').css("background-color", "#3D3D3D");
    }
    if(data.currently.icon === "clear-day"){
        $('#sunContainer').css("display", "block");
    }
    if(data.currently.icon === "partly-cloudy-day"){
      $('#cloudContainer').css("display", "block");
    }
    if(data.currently.icon === "rain"){
      $('#rainContainer').css("display", "block");
    }
  });
}
