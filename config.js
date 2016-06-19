
window.addScript = function(src,callback) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-Y3EQPS2pywoCVD_9WsFZwWJb8uDx4BE&libraries=places&callback=initMap" );
  s.setAttribute('async defer')
  s.onload=callback;
  $('#script').appendChild( s );
}

// window.initMap = function() {
