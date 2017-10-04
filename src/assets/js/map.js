var map;
var marker;
var gmarkers = [];
var pos = { lat: 46.005947239114626, lng: 24.790892606250054 };
var geocoder;
var infowindow;


window.initMap = function() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center:  pos
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            map.setZoom(13);

            if(gmarkers.length>0){
                for(i=0;i<gmarkers.length;i++){
                    gmarkers[i].setMap(null);
                }
            }

            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position:  pos
            });

            gmarkers.push(marker);
            marker.addListener('click', toggleBounce);


        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }

}

window.toggleBounce = function() {

        marker.setAnimation(google.maps.Animation.BOUNCE);

    }



