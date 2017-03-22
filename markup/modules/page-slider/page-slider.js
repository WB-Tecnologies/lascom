import 'scrolloverflow';
import 'fullpage';

window._jQuery = $;
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
    paddingTop: '130px',
    afterRender: backgroundVideoStep,
    onLeave: runBackgroundVideo
});

function backgroundVideoStep() {
    laserVideo.play();
    setTimeout(() => {
        laserVideo.pause();
    }, 1000);
}

function runBackgroundVideo(index, nextIndex) {
    if (nextIndex === VIDEO_SLIDE_INDEX) {
        laserVideo.play();
    } else {
        laserVideo.pause();
    }
}
