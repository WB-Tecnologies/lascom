import 'fullpage';

window._jQuery = $;
let $sliderWrapper = $('#c-slider-wrapper');

console.log($sliderWrapper);
$sliderWrapper.fullpage({
    autoScrolling: true,
    css3: true,
    scrollingSpeed: 800,
    fadingEffect: true,
    fitToSection: false,
    scrollBar: true
});
