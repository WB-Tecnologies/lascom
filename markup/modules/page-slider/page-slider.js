import 'scrolloverflow';
import 'fullpage';

window._jQuery = $;
const $window = $(window);
const VIDEO_SLIDE_INDEX = 3;
const $anchorsNav = $('.anchors-nav');
const $navLinks = $('.anchors-nav__desktop .anchors-nav-list_link');
let laserVideo = document.querySelector('.laser-videobg');
let $sliderWrapper = $('#c-slider-wrapper');
let anchorsArray = getAnchorsArray();

toggleAutoscrollByMediaQuery();
$window.on('orderIsOpen', sliderScrollDisable);
$window.on('orderIsClose', sliderScrollEnable);

function initSlider() {
    $sliderWrapper.fullpage({
        autoScrolling: false,
        scrollOverflow: false,
        css3: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        scrollingSpeed: 1000,
        fadingEffect: false,
        fitToSection: false,
        scrollBar: false,
        paddingTop: '70px',
        anchors: anchorsArray,
        afterRender: backgroundVideoStep,
        onLeave: onSlideLeave
    });
}

function getAnchorsArray() {
    let anchors = [];
    $navLinks.each((index, item) => {
        let anchorHref = $(item).attr('href').slice(1);
        anchors.push(anchorHref);
    });
    return anchors;
}


function sliderScrollEnable() {
    let _slideScrollEnabled = $.fn.fullpage.setAllowScrolling && $.fn.fullpage.setAllowScrolling(true);
}

function sliderScrollDisable() {
    let slideScrollDisabled = $.fn.fullpage.setAllowScrolling && $.fn.fullpage.setAllowScrolling(false);
}

function backgroundVideoStep() {
    if (!laserVideo) {
        return;
    }

    setTimeout(() => {
        laserVideo.play();
    }, 1000);
}

function onSlideLeave(index, nextIndex) {
    // runBackgroundVideo(index, nextIndex);
    ofsetMachineWithHeaderSubsection();
    $window.trigger('slideChanged', nextIndex);

}

function ofsetMachineWithHeaderSubsection() {
    setTimeout(() => {
        if ($anchorsNav.hasClass('anchors-nav_hidden')) {
            $('.detached-screen__machine').removeClass('detached-screen__machine-header-open');
        } else {
            $('.detached-screen__machine').addClass('detached-screen__machine-header-open');
        }
    }, 200);
}

function runBackgroundVideo(index, nextIndex) {
    // if (!laserVideo) {
    //     return;
    // }
    // if (nextIndex === VIDEO_SLIDE_INDEX) {
    //     laserVideo.play();
    // } else {
    //     laserVideo.pause();
    // }
}

function scrollToSlide(e, _slideNumber) {
    $.fn.fullpage.moveTo(_slideNumber);
}

function toggleAutoscrollByMediaQuery() {
    var _matchMediaObject = window.matchMedia('(max-width: 1024px)');

    autoscrollToggle(_matchMediaObject.matches);

    // Add listener.
    _matchMediaObject.addListener(function () {
        autoscrollToggle(_matchMediaObject.matches);
    });
}


function autoscrollToggle(_mediaMatch) {
    if (_mediaMatch) {
        let _fpExist = $.fn.fullpage.destroy && $.fn.fullpage.destroy('all');
    } else {
        initSlider();
    }
}




















