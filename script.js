function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.319, lng: 82.965 },
        zoom: 12.5,
        mapId: '4719b11c4529a336'
      });

    

    const iconBase =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
      fullbin: {
        icon: iconBase + "parking_lot_maps.png",
      },
      emptybin: {
        icon: iconBase + "library_maps.png",}
      }

    const features = [
        {
          position: new google.maps.LatLng(25.283165, 82.969402),
          type: "fullbin",
          
        },
        {
          position: new google.maps.LatLng(25.283216, 82.96640),
          type: "emptybin",
          
        },
        {
          position: new google.maps.LatLng(25.285930, 82.968565),
          type: "fullbin",
          
        },]
        for (let i = 0; i < features.length; i++) {
            var marker = new google.maps.Marker({
              position: features[i].position,
              icon: icons[features[i].type].icon,
              map: map,
            });

            
            var infowindow = new google.maps.InfoWindow();
           
            function makeInfoWindowEvent(map, infowindow,contentString, marker) {
                google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent(contentString);
                  infowindow.open(map, marker);
                });
              }
              marker.addListener('click',makeInfoWindowEvent(map, infowindow,'<button id="fill"> Filled</button>'+'/n'+'<button id="empty"> Empty</button>', marker) )
          }
          
          

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
                  infowindow.setPosition(pos);
                  infowindow.setContent("Pin");
                  infowindow.open(map);
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
        }
        new google.maps.Marker({
          position: pos,
          map: map,
        });
        
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(
            browserHasGeolocation
              ? "Error: The Geolocation service failed."
              : "Error: Your browser doesn't support geolocation."
          );
          infoWindow.open(map);
        }
        


