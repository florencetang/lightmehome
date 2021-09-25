let map, infoWindow;

const citydmap = {
  cityd1: {
    center: { lat: -37.81, lng: 144.9691 },
    darklevel: 1,
  },
  cityd2: {
    center: { lat: -37.85, lng: 145 },
    darklevel: 1,
  },
  cityd3: {
    center: { lat: -37.83, lng: 145 },
    darklevel: 1,
  },
  cityd4: {
    center: { lat: -37.83, lng: 144.96 },
    darklevel: 0.5,
  },

  cityd5: {
    center: { lat: 37.816038, lng: 144.965896 },
    darklevel: 3,
  },
  cityd6: {
    center: { lat: -37.816355, lng: 144.965446 },
    darklevel: 2,
  },
  cityd7: {
    center: { lat: -37.81669796727798, lng: 144.96556249812917 },
    darklevel: 1,
  },
  cityd8: {
    center: { lat: -37.816909, lng: 144.966561 },
    darklevel: 0.5,
  },
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -37.8180, lng: 144.9691 },
    zoom: 13,
  });

for (const city in citydmap) {
  // Add the circle for this city to the map.
  const cityCircle = new google.maps.Circle({
    strokeWeight: 0,
    fillColor: "#8587DC",
    fillOpacity: 0.35,
    map,
    center: citydmap[city].center,
    radius: Math.sqrt(citydmap[city].darklevel) * 100,
  });
}

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

locationButton.textContent = "Pan to Current Location";
locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
locationButton.addEventListener("click", () => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
});

  const walkPlanCoordinates = [
  { lat: -37.815779, lng: 144.965337 },
  { lat: -37.815437, lng: 144.966486 },
  { lat: -37.817414, lng: 144.967371 },
  { lat: -37.817587, lng: 144.966762 },
  { lat: -37.8183, lng: 144.967371 },
];

const walkPath = new google.maps.Polyline({
  path: walkPlanCoordinates,
  geodesic: true,
  strokeColor: "lightgreen",
  strokeOpacity: 1.0,
  strokeWeight: 4,
});

walkPath.setMap(map);

}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
  browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
);
infoWindow.open(map);
}


// SEARCH

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -37.8180, lng: 144.9691},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  
for (const city in citydmap) {
  // Add the circle for this city to the map.
  const cityCircle = new google.maps.Circle({
    strokeColor: "#74099e",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#af48c9",
    fillOpacity: 0.35,
    map,
    center: citydmap[city].center,
    radius: Math.sqrt(citydmap[city].darklevel) * 100,
  });
}

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

locationButton.textContent = "Pan to Current Location";
locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
locationButton.addEventListener("click", () => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
});

  const walkPlanCoordinates = [
  { lat: -37.83, lng: 144.9691 },
  { lat: -37.824, lng: 145.002 },
  { lat: -37.81, lng: 145 },
];
const walkPath = new google.maps.Polyline({
  path: walkPlanCoordinates,
  geodesic: true,
  strokeColor: "lightgreen",
  strokeOpacity: 1.0,
  strokeWeight: 4,
});

walkPath.setMap(map);

}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
  browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
);
infoWindow.open(map);
}