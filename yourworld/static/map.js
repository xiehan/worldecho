var darkMapStyle=[
  {
    stylers: [
      { invert_lightness: true }
    ]
  },{
    featureType: "landscape",
    stylers: [
      { visibility: "simplified" }
    ]
  },{
    featureType: "poi",
    stylers: [
      { lightness: -50 }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { lightness: -40 }
    ]
  },{
    featureType: "transit",
    elementType: "labels",
    stylers: [
      { gamma: 2.04 },
      { lightness: -33 }
    ]
  },{
    featureType: "road.arterial",
    stylers: [
      { hue: "#00e5ff" },
      { gamma: 0.47 },
      { lightness: -21 }
    ]
  },{
    featureType: "road.highway",
    stylers: [
      { lightness: -56 }
    ]
  },{
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      { visibility: "on" },
      { lightness: -40 }
    ]
  },{
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { lightness: -10 }
    ]
  },{
    featureType: "transit",
    elementType: "labels",
    stylers: [
      { visibility: "on" },
      { lightness: -18 }
    ]
  }
];

var darkMapType = new google.maps.StyledMapType(darkMapStyle,
  {name: "Dark Maps"});


var map;

var centerOfWorld= new google.maps.LatLng(40.7294317, -73.99358870000003);  //ITP's location, duh
var initialUserPos;
var pixelWorldCenter, pixelUser;

function initialize() {
  var myOptions = {
    zoom: 16,
    // zoom: 11,
    disableDoubleClickZoom : true,
    scrollwheel: false,
    draggable: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'dark_map']
      }
  };
  
  map = new google.maps.Map(document.getElementById('mapcanvas'), myOptions);
  
  var overlay;

  map.mapTypes.set('dark_map', darkMapType);
  map.setMapTypeId('dark_map');

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      initialUserPos =pos;


      var marker = new google.maps.Marker({
                  map: map,
                  position: pos,
              });


      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: centerOfWorld,
        content: '<b>The center of the world.</b>',
        disableAutoPan: true
      });

        map.setCenter(pos);
        distanceFromCenter=  google.maps.geometry.spherical.computeDistanceBetween(centerOfWorld, pos);

        console.log('distancefrom center in meters:');
        console.log(distanceFromCenter);

        overlay = new ywotOverlay(map);

        console.log('distancefrom center in pix:');
        // console.log(pixelDistanceFromCenter);


    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}


function ywotOverlay(map) {
  this.map_ = map;
  this.div_ = null;
  this.setMap(map);
}

ywotOverlay.prototype = new google.maps.OverlayView();

ywotOverlay.prototype.draw = function() {
  console.log('drawing our overlay');
  var overlayProjection = this.getProjection();
  console.log(overlayProjection)

  var div = document.createElement('DIV');
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);

  pixelWorldCenter = overlayProjection.fromLatLngToDivPixel(centerOfWorld);
  console.log('pixelWorldCenter',pixelWorldCenter);

  pixelUser = overlayProjection.fromLatLngToDivPixel(initialUserPos);
  console.log('pixelUser',pixelUser);

  //this probably isn't the place for this, but whatever
  YourWorld.World.JumpToGmapsPix();
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = '<b>Error: The Geolocation service failed.</b>';
  } else {
    var content = '<b>Error: Your browser doesn\'t support geolocation.</b>';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(40.7294317, -73.99358870000003),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);