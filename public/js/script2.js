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

            var d = new Date();
            var n = d.getDay();

            var open_to_close = place.opening_hours.periods[n].open.time + ' - ' + place.opening_hours.periods[n].close.time;

            setPlaceInfoFromMap(place.place_id, place.name, place.formatted_address, place.formatted_phone_number, open_to_close, place.website);

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
      $('#name').text('Name: ' + name);
      $('#address').text('Address: ' + address);
      $('#phone').text('Phone: ' + phone);
      $('#hours').text('Hours: ' + hours);
      $('#website').text('Website: ' + website);
    };

    //Modal

var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

  $('a[data-modal-id]').click(function(e) {

    e.preventDefault();

    $("body").append(appendthis);

    $(".modal-overlay").fadeTo(500, 0.7);

    //$(".js-modalbox").fadeIn(500);

    var modalBox = $(this).attr('data-modal-id');

    $('#'+modalBox).fadeIn($(this).data());

  });





$(".js-modal-close, .modal-overlay").click(function() {

  $(".modal-box, .modal-overlay").fadeOut(500, function() {

    $(".modal-overlay").remove();

  });

});



$(window).resize(function() {

  $(".modal-box").css({

    top: ($(window).height() - $(".modal-box").outerHeight()) / 2,

    left: ($(window).width() - $(".modal-box").outerWidth()) / 2

  });

});



$(window).resize();


});
