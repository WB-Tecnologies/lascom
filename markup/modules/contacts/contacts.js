import googleApi from 'google-maps';

googleApi.load((google) => {
    initMap(google);
});

function initMap(google) {
    let lascomOffice = {lat: 56.749565, lng: 37.226751};

    let mapDiv = document.getElementById('map');
    let map = new google.maps.Map(mapDiv, {
        center: lascomOffice,
        zoom: 15
    });

    let marker = new google.maps.Marker({
        position: lascomOffice,
        map: map,
        title: 'Lascom office'
    });
}
