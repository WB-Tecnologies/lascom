import googleApi from 'google-maps';

googleApi.load((google) => {
    initMap(google);
});

function initMap(google) {
    let lascomOffice = {lat: 56.749665, lng: 37.22828};

    let mapDiv = document.getElementById('map');
    let map = new google.maps.Map(mapDiv, {
        center: lascomOffice,
        zoom: 15,
        mapTypeControl: false
    });


    let marker = new google.maps.Marker({
        position: lascomOffice,
        map: map,
        labelClass: 'label'
    });

}
