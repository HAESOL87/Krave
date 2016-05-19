$(document).ready(function() {

      // Initialize Map
      window.initMap = function() {
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: favPlaceId
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {

            var map = new google.maps.Map(document.getElementById('map'), {
              center: place.geometry.location,
              zoom: 15
            });

            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });

            setPlaceInfoFromMap(place.place_id, place.name, place.formatted_address, place.formatted_phone_number, place.opening_hours, place.website);

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '<br>' + place.formatted_phone_number + '<br>' + place.opening_hours.periods[0].open.time + ' - ' + place.opening_hours.periods[0].close.time  + '<br>' + place.website + '<br>');
              infowindow.open(map, this);
            });
          }

        });
      }

    // Retrive and set place info on page
    function setPlaceInfoFromMap (placeID, name, address, phone, hours, website) {

      var notApplicable = 'N/A';
      var d = new Date();
      var n = d.getDay();

      let phoneText;
      if (phone === undefined) {
        phoneText = 'Phone: ' + notApplicable;
      }
      else {
        phoneText = 'Phone: ' + phone;
      }

      let hoursText;
      if(hours === undefined) {
        hoursText = 'Hours: ' + notApplicable;
      }
      else if(hours.open_now === false) {
        hoursText = 'Hours: Currently closed';
      }
      else {
        var openTime = getFormattedTime(hours.periods[n].open.time);
        var closeTime = getFormattedTime(hours.periods[n].close.time);
        var open_to_close =  openTime + ' - ' + closeTime;
        hoursText = 'Hours: ' + open_to_close;
      }

      let websiteText;
      if (website === undefined) {
        websiteText = 'Website: ' + notApplicable;
      }
      else {
        websiteText = 'Website: ' + website;
      }

      $('#name').text('Name: ' + name);
      $('#address').text('Address: ' + address);
      $('#phone').text(phoneText);
      $('#hours').text(hoursText);
      $('#website').text(websiteText);

      $('#placeNameField').val(name);
      $('#placeIDField').val(placeID);
    };

    // Change time format
    function getFormattedTime(fourDigitTime) {
      var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
      var hours = ((hours24 + 11) % 12) + 1;
      var amPm = hours24 > 11 ? 'pm' : 'am';
      var minutes = fourDigitTime.substring(2);

    return hours + ':' + minutes + amPm;
>>>>>>> f13022f3b7acf92997fde12619b265cfb27aa172
    };

});
