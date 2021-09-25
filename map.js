// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -37.8180, lng: 144.9691 },
//     zoom: 12,
//   });
// }

// This example creates a 2-pixel-wide red polyline showing the path of
// the first trans-Pacific flight between Oakland, CA, and Brisbane,
// Australia which was made by Charles Kingsford Smith.

// function initMap() {
//     
//   }

  // Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

let map, infoWindow;

const citydmap = {
  cityd1: {
    center: { lat: -37.8180, lng: 144.9691 },
    darklevel: 3,
  },
  cityd2: {
    center: { lat: -37.85, lng: 145 },
    darklevel: 2,
  },
  cityd3: {
    center: { lat: -37.83, lng: 145 },
    darklevel: 1,
  },
  cityd4: {
    center: { lat: -37.83, lng: 144.96 },
    darklevel: 0.5,
  },
}

const citylmap = {
  cityl1: {
    center: { lat: -37.83, lng: 144.9691 },
    numlights: 5,
  },
  cityl2: {
    center: { lat: -37.87, lng: 145 },
    numlights: 9,
  },
  cityl3: {
    center: { lat: -37.81, lng: 145 },
    numlights: 20,
  },
  cityl4: {
    center: { lat: -37.85, lng: 144.96 },
    numlights: 14,
  },
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -37.8180, lng: 144.9691 },
    zoom: 13,
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

for (const city in citylmap) {
  // Add the circle for this city to the map.
  const cityCircle = new google.maps.Circle({
    strokeColor: "#FDBB30",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FDBB30",
    fillOpacity: 0.35,
    map,
    center: citylmap[city].center,
    radius: Math.sqrt(citylmap[city].numlights) * 100,
  });

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
    { lat: -37.87, lng: 145 },
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

}
