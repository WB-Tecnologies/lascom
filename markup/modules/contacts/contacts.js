import $ from 'jquery';
import googleApi from 'google-maps';

const MOBILE_SIZE = 768;
let isDraggable = $(document).width() > MOBILE_SIZE ? true : false;
let mapDiv = document.getElementById('map-ru');

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
        scrollwheel: false,
        styles: [
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    { color: '#fafafa' }
                ]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                    { color: '#f0f0f0' }
                ]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    { visibility: 'off' }
                ]
            }, {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {color: '#d4d4d4'}
                ]
            }
        ]
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        lascom: {
            icon: 'static/img/general/icon-lascom-map.png'
        }
    };


    let marker = new google.maps.Marker({
        position: lascomOffice,
        icon: icons.lascom.icon,
        map: map
    });

}
