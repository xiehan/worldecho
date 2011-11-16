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

function initialize() {
  var myOptions = {
    zoom: 12,
    disableDoubleClickZoom : true,
    scrollwheel: false,
    
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'dark_map']
      }
  };
  
  map = new google.maps.Map(document.getElementById('yourworld'), myOptions);

  map.mapTypes.set('dark_map', darkMapType);
  map.setMapTypeId('dark_map');

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      // var infowindow = new google.maps.InfoWindow({
      //   map: map,
      //   position: pos,
      //   content: 'Location found using HTML5.'
      // });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  // var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);