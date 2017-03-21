import 'scrolloverflow';
import 'fullpage';


window._jQuery = $;
let $sliderWrapper = $('#c-slider-wrapper');

console.log($sliderWrapper);
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
    afterRender: runBackgroundVideo
});

function runBackgroundVideo() {
    let laserVideo = document.querySelector('.laser-videobg');
    laserVideo = laserVideo ? laserVideo.play() : null;
}
