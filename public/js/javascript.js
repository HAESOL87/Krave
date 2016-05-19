$(document).ready(function() {

      var map;
      var infowindow;

      var kraveId = window.location.pathname.slice(10);
      var kraveName = $('#name').text();
      var kraveCity = $('#city').text();
      var kraveState = $('#state').text();
      var kraveZip = $('#zip').text();
      var address = kraveCity + ", " + kraveState + " " + kraveZip;

// Render Map
      window.initMap = function() {
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
          radius: 2000,
          types: ['restaurant' | 'food' | 'cafe' | 'grocery_or_supermarket'],
          keyword: kraveName
        }, processSearchResults);
      }

      function processSearchResults(results, status) {
        console.log('processSearchResults called.');
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          getPlace(results);

        }
        else {
          console.log('status:', status);
        }
      }

      function createMarker(place) {
        console.log('createMarker called with place = ', place);
        //console.log(place.name);
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

// Render list of places based on address
      function getPlace(results) {
        var placesElement = $('#places');
        var notApplicable = 'N/A';
        for (var i = 0; i < results.length; i++) {
            let label1;
            let label2;
            let div = $('<div style="margin-top: 20px"></div>');
            if (results[i].rating === undefined) {
            label1 = results[i].name + ' - ' + 'Rating: ' + notApplicable;
            }
            else {
            label1 = results[i].name + ' - ' + 'Rating: ' + results[i].rating;
            }
            if (results[i].price_level === undefined) {
            label2 = 'Price Level: ' + notApplicable;
            }
            else {
            label2 = 'Price Level: ' + results[i].price_level;
            }
            //let label = results[i].name + ' (' + results[i].place_id + ')';
            var url = '/kravings/' + kraveId + '/info/' + results[i].place_id;

            div.append($('<a id="label1" href="' + url + '"></a>').text(label1));
            div.append($('<p id="label2"></p>').text(results[i].vicinity));
            div.append($('<p id="label3"></p>').text(label2));

            // var url = '/kravings/' + kraveId + '/info/' + results[i].place_id;
            $('#label1').attr('href', url);

            placesElement.append(div);
        }
      }

      // // Render list of places based on address
      // function getPlace(results) {
      //   var placesElement = $('#places');
      //   var notApplicable = 'N/A';
      //   for (var i = 0; i < results.length; i++) {
      //       let label1;
      //       let label2;
      //       let div = $('<div style="margin-top: 20px"></div>');
      //       if (results[i].rating === undefined) {
      //       label1 = results[i].name + ' - ' + 'Rating: ' + notApplicable;
      //       }
      //       else {
      //       label1 = results[i].name + ' - ' + 'Rating: ' + results[i].rating;
      //       }
      //       if (results[i].price_level === undefined) {
      //       label2 = results[i].vicinity + ' - ' + 'Price Level: ' + notApplicable;
      //       }
      //       else {
      //       label2 = results[i].vicinity + ' - ' + 'Price Level: ' + results[i].price_level;
      //       }
      //       //let label = results[i].name + ' (' + results[i].place_id + ')';
      //       div.append($('<p id="label1"></p>').text(label1));
      //       div.append($('<p id="label2"></p>').text(label2));
      //       var url = '/kravings/' + kraveId + '/info/' + results[i].place_id;
      //       div.append($('<a></a>').attr('href', url).html('Info'));
      //       div.append('<hr/>')
      //       placesElement.append(div);
      //   }
      // }


});
