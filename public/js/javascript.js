
window.getCoordinates = function(address, callback) {
        var coordinates;

        geocoder.geocode({ address: address }, function(results, status) {
          coords_lat = results[0].geometry.location.lat();
          coords_lng = results[0].geometry.location.lng();
          coordinates = [coords_lat, coords_lng];
          callback(coordinates);
        });
      }
