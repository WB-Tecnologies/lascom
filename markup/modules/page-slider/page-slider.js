import 'scrolloverflow';
import 'fullpage';

window._jQuery = $;
const $window = $(window);
const VIDEO_SLIDE_INDEX = 3;
let laserVideo = document.querySelector('.laser-videobg');
let $sliderWrapper = $('#c-slider-wrapper');

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
    afterRender: backgroundVideoStep,
    onLeave: runBackgroundVideo
});

$window.on('orderIsOpen', sliderScrollDisable);
$window.on('orderIsClose', sliderScrollEnable);
$window.on('scrollTop', fitSliderNoHeaderSubsection);
$window.on('scrollBottom', fitSliderWithHeaderSubsection);


function fitSliderNoHeaderSubsection() {
    // $('.fp-tableCell').css('padding-top', '0');
}

function fitSliderWithHeaderSubsection() {
    // $('.fp-tableCell').css('padding-top', '60px');
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
