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

initSlider();
$window.on('orderIsOpen', sliderScrollDisable);
$window.on('orderIsClose', sliderScrollEnable);

function initSlider() {
    $sliderWrapper.fullpage({
        autoScrolling: true,
        scrollOverflow: true,
        css3: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        scrollingSpeed: 1500,
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
    let anchors = [''];
    $navLinks.each((index, item) => {
        let anchorHref = $(item).attr('href').slice(1);
        anchors.push(anchorHref);
    });
    return anchors;
}

function sliderScrollEnable() {
    $.fn.fullpage.setAllowScrolling(true);
}

function sliderScrollDisable() {
    $.fn.fullpage.setAllowScrolling(false);
}

function backgroundVideoStep() {
    if (!laserVideo) {
        return;
    }

    laserVideo.play();
    setTimeout(() => {
        laserVideo.pause();
    }, 1000);
}

function onSlideLeave(index, nextIndex) {
    runBackgroundVideo(index, nextIndex);
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
    if (!laserVideo) {
        return;
    }
    if (nextIndex === VIDEO_SLIDE_INDEX) {
        laserVideo.play();
    } else {
        laserVideo.pause();
    }
}

function scrollToSlide(e, _slideNumber) {
    console.log(_slideNumber);
    $.fn.fullpage.moveTo(_slideNumber);
}
