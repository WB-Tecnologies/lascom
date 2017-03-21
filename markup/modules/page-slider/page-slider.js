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
    scrollingSpeed: 800,
    fadingEffect: false,
    fitToSection: false,
    scrollBar: true,
    afterRender: runBackgroundVideo
});

function runBackgroundVideo() {
    document.querySelector('.laser-videobg').play();
}
