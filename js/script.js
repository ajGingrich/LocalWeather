/**
 * Created by Andrew on 13/10/2016.
 */

var key = "813235d7c0dba46703de43f8be322392";
//Cap First Letter//
var caps = function(str) {
    str = str.split(" ");
    for (var i=0; i<str.length; i++) {
        str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1);
    }
    str = str.join(" ");
    return str;
};

//get lat and long
///Use Callback because AJAX is asynchronous

function getLocation(callback) {
    $.getJSON("https://freegeoip.net/json/", function(location) {
        callback(location);
    });
}


getLocation(function(location){
    var latitude = location.latitude;
    var longitude = location.longitude;
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + key,
        dataType: 'json',
        success: function(data) {
            //console.log(JSON.stringify(data));
            $('#Location').html("Location:  " + data.name + ", " + data.sys.country);
            window.tempC = Math.round(parseInt(data.main.temp, 10) - 273.15);
            window.tempF = Math.round((tempC * (9/5)) + 32 );
            $('#temp').html("Current Temperature:   " + tempC + "  C");
            $('#conditions').html("Current Weather Conditions:  " + caps(data.weather[0].description));
            var icon = data.weather[0].icon;
            $('#icon').html('<img src="http://openweathermap.org/img/w/' + icon + '.png">');
        },
        error: function() {
            alert('error');
        }
    });
});

///Change C and F
var changeC = function() {
    $('#temp').html("Current Temperature:   " + tempC + "  C");
};
var changeF = function() {
    $('#temp').html("Current Temperature:   " + tempF + "  F");
};

$('#btn-celsius').click(changeC);
$('#btn-fahrenheit').click(changeF);

/*Bouncy!*/
/*$(document).ready(function() {
    $('#center').click(function() {
        $(this).effect('bounce', {times: 3}, 500);
    });
});*/
/////Save this to test for successfully AJAX call///////
/*$.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?id=4763231&appid=813235d7c0dba46703de43f8be322392",
    dataType: 'json',
    success: function() {
        alert("success");
    },
    error: function() {
        alert('error');
    }
});*/

/////Using Promise////
/*var getLocation = function() {
 return $.getJSON("https://freegeoip.net/json/");
 };

 $.when(getLocation()).then(function(location){
 console.log(location);
 window.latitude = location.latitude;
 //console.log(latitude);
 });

 console.log(latitude);*/