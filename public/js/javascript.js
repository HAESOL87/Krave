$(document).ready(function() {

      var map;
      var infowindow;

      var kraveCity = $('#city').text();
      var kraveState = $('#state').text();
      var kraveZip = $('#zip').text();
      var address = kraveCity + ", " + kraveState + " " + kraveZip;

      console.log(address);

      // window.getCoordinates = function(address, callback) {
      //   var coordinates;

      //   geocoder.geocode({ address: address }, function(results, status) {
      //     coords_lat = results[0].geometry.location.lat();
      //     coords_lng = results[0].geometry.location.lng();
      //     coordinates = [coords_lat, coords_lng];
      //     callback(coordinates);
      //   });
      // }

      window.initMap = function() {
        //var latlong = {lat: 33.7490, lng: -84.3880};
        //var latlong = {};
        getCoordinates(address, createMap);
      };

      function getCoordinates(address, cb) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function(results, status) {
          coords_lat = results[0].geometry.location.lat();
          coords_lng = results[0].geometry.location.lng();
          cb( {lat: coords_lat, lng: coords_lng} );
        });
      }

      function createMap(latlong) {
        console.log('getCoordinates callback got latlong = ', latlong);
        map = new google.maps.Map(document.getElementById('map'), {
          center: latlong,
          zoom: 15
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch({
          location: latlong,
          radius: 500,
          type: ['restaurant']
        }, processSearchResults);
      }

      function processSearchResults(results, status) {
        console.log('processSearchResults called.');
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
        else {
          console.log('status:', status);
        }
      }

      function createMarker(place) {
        console.log('createMarker called with place = ', place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name, place.opening_hours);
          infowindow.open(map, this);
        });
      }

});
