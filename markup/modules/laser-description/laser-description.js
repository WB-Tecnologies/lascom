import '@zeitiger/elevatezoom';

const $window = $(window);
let $zoomCover = $('.c-zoom-cover');
let $zoomContainer;

toggleZoomCoverByMediaQuery();

function zoomCoverInit() {
    $zoomCover.elevateZoom({
        zoomType: 'lens',
        lensShape: 'round',
        lensSize: 250
    });

    setTimeout(() => {
        $zoomContainer = $('.zoomContainer');
        $zoomContainer.insertAfter($zoomCover);
    }, 1000);
}

function zoomCoverDestroy() {
    $.removeData($zoomCover, 'elevateZoom');
    $('.zoomContainer').remove();
}

function toggleZoomCoverByMediaQuery() {
    var matchMediaObject = window.matchMedia('(max-width: 1024px)');

    zoomCoverToggle(matchMediaObject.matches);

    // Add listener.
    matchMediaObject.addListener(function () {
        zoomCoverToggle(matchMediaObject.matches);
    });
}

function zoomCoverToggle(_mediaMatch) {
    if (_mediaMatch) {
        zoomCoverDestroy();
    } else {
        zoomCoverInit();
    }
}

