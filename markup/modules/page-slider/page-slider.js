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
    anchors: [
        '',
        'work-principles',
        'laser',
        '',
        '',
        'software',
        'equipment',
        'order'
    ],
    afterRender: backgroundVideoStep,
    onLeave: onSlideLeave
});

$window.on('orderIsOpen', sliderScrollDisable);
$window.on('orderIsClose', sliderScrollEnable);
// $window.on('scrollByNav', scrollToSlide);


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
    $window.trigger('slideChanged', nextIndex);
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
























