import 'fullpage';

window._jQuery = $;
let $sliderWrapper = $('#c-slider-wrapper');

console.log($sliderWrapper);
$sliderWrapper.fullpage({
    autoScrolling: false,
    css3: true,
    scrollingSpeed: 800,
    fadingEffect: true,
    fitToSection: false,
    scrollBar: true,
    afterRender: runBackgroundVideo
});

function runBackgroundVideo() {
    document.querySelector('.laser-videobg').play();
}
