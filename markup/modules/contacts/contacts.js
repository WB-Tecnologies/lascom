import $ from 'jquery';
import googleApi from 'google-maps';

const MOBILE_SIZE = 768;
let isDraggable = $(document).width() > MOBILE_SIZE ? true : false;
let mapDiv = document.getElementById('map');

googleApi.load((google) => {
    if (mapDiv) {
        initMap(google);
    }
});

function initMap(google) {
    let lascomOffice = {lat: 56.749665, lng: 37.22828};

    let map = new google.maps.Map(mapDiv, {
        center: lascomOffice,
        zoom: 14,
        mapTypeControl: false,
        draggable: isDraggable,
        scrollwheel: false
    });


    let marker = new google.maps.Marker({
        position: lascomOffice,
        map: map,
        labelClass: 'label'
    });

}
