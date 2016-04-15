import _ from 'lodash';

const body = document.querySelector('body');
const slides = document.querySelectorAll('.detached-screen');

// Set body height by slides count.
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
body.style.height = viewPortHeight * slides.length + 'px';

// Set z-index for slides.
let index = slides.length;
_.forEach(slides, (slide) => {
    slide.style.zIndex = (index--);
    slide.style.display = 'block';
});

// Scroll slides.
let currentSlide = 1;
let pageYOld = window.pageYOffset;
let scrollSlides = () => {
    let currentSlideBoundary = currentSlide * viewPortHeight;

    // Scroll direction top.
    if (pageYOld > window.pageYOffset && window.pageYOffset < currentSlideBoundary) {
        slides[currentSlide].style.position = 'fixed';
        slides[currentSlide].style.top = 'initial';
        if (--currentSlide < 1) {
            currentSlide = 1;
        }

    // Scroll direction bottom.
    } else if (window.pageYOffset >= currentSlideBoundary) {
        slides[currentSlide].style.position = 'absolute';
        slides[currentSlide].style.top = currentSlideBoundary + 'px';
        if (currentSlide < (slides.length - 1)) {
            currentSlide++;
        }
    }
    pageYOld = window.pageYOffset;
};
scrollSlides = _.throttle(scrollSlides, 10);

window.addEventListener('scroll', scrollSlides);

