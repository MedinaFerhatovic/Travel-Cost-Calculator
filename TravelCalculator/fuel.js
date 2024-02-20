
var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    var startInput = document.getElementById('start');
    var endInput = document.getElementById('end');
    var routeControl = null; // Dodajte globalnu promenljivu za kontrolu rute

    function calculateDistance() {
      var startAddress = startInput.value;
      var endAddress = endInput.value;
      var distanceInput = document.getElementById('distance');

      if (!startAddress || !endAddress) {
        alert('Unesite početak i kraj puta.');
        return;
      }

      // Koristite OSM Nominatim API za geokodiranje početne i krajnje adrese
      var geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=`;

      fetch(geocodeUrl + encodeURIComponent(startAddress))
        .then(response => response.json())
        .then(data => {
          var startLat = data[0].lat;
          var startLon = data[0].lon;

          return fetch(geocodeUrl + encodeURIComponent(endAddress))
            .then(response => response.json())
            .then(data => {
              var endLat = data[0].lat;
              var endLon = data[0].lon;

              // Uklonite prethodno kreiranu kontrolu rute ako postoji
              if (routeControl) {
                map.removeControl(routeControl);
              }

              // Kreirajte ruti kontrolu koristeći Leaflet Routing Machine
              routeControl = L.Routing.control({
                waypoints: [
                  L.latLng(startLat, startLon),
                  L.latLng(endLat, endLon),
                ],
                routeWhileDragging: true,
                lineOptions: {
                  styles: [{ color: 'blue', opacity: 0.6, weight: 4 }],
                },
              }).addTo(map);

              routeControl.on('routesfound', function (e) {
                // Dobijanje rute i izračunavanje ukupne udaljenosti
                var routes = e.routes;
                var totalDistance = routes[0].summary.totalDistance / 1000; // Udaljenost u kilometrima
                distanceInput.value = totalDistance.toFixed(1);
              });
            });
        })
        .catch(error => {
          console.error('Greška pri geokodiranju:', error);
          alert('Greška pri geokodiranju adresa.');
        });
    }