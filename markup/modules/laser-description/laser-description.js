import '@zeitiger/elevatezoom';

const $window = $('window');
let $zoomCover = $('.c-zoom-cover');
let $zoomContainer;

toggleZoomCoverByMediaQuery();

function scrollOverZoomEnable() {
    window.addEventListener('mousewheel', scrollOverZoom);
}

function scrollOverZoomDisable() {
    window.removeEventListener('mousewheel', scrollOverZoom);
}

function scrollOverZoom(e) {
    if (e.wheelDelta > 0) {
        $.fn.fullpage.moveSectionUp();
        scrollOverZoomDisable();
    } else {
        $.fn.fullpage.moveSectionDown();
        scrollOverZoomDisable();
    }
}

function zoomCoverInit() {
    $zoomCover.elevateZoom({
        zoomType: 'lens',
        lensShape: 'round',
        lensSize: 300
    });

    setTimeout(() => {
        $zoomContainer = $('.zoomContainer');
        $zoomContainer.on('mouseenter', scrollOverZoomEnable);
        $zoomContainer.on('mouseleave', scrollOverZoomDisable);
    }, 500);

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

