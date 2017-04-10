import '@zeitiger/elevatezoom';

let $zoomCover = $('.c-zoom-cover');

toggleZoomCoverByMediaQuery();

function zoomCoverInit() {
    $zoomCover.elevateZoom({
        zoomType: 'lens',
        lensShape: 'round',
        lensSize: 300
    });
}

function zoomCoverDestroy() {
    $.removeData($zoomCover, 'elevateZoom');
    $('.zoomContainer').remove();
}

function toggleZoomCoverByMediaQuery() {
    var _matchMediaObject = window.matchMedia('(max-width: 1024px)');

    zoomCoverToggle(_matchMediaObject.matches);

    // Add listener.
    _matchMediaObject.addListener(function () {
        zoomCoverToggle(_matchMediaObject.matches);
    });
}

function zoomCoverToggle(_mediaMatch) {
    if (_mediaMatch) {
        zoomCoverDestroy();
    } else {
        zoomCoverInit();
    }
}
