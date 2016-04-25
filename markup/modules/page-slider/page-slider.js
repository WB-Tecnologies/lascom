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
    let pageYNew = window.pageYOffset;

    // Scroll direction top.
    if (pageYOld > pageYNew) {

        // Calculate nextSlide opacity while scroll up.
        let nextSlideOpacity = 1 - (pageYNew / viewPortHeight - (currentSlide - 1));
        let nextSlideOverlay = slides[currentSlide].querySelector('.detached-screen_overlay');
        nextSlideOverlay.style.opacity = nextSlideOpacity;

        // Set current slide fixed.
        if (pageYNew < currentSlideBoundary) {
            slides[currentSlide].style.position = 'fixed';
            slides[currentSlide].style.top = 'initial';

            // Switch slide when upslide overlay it.
            if (pageYNew < (currentSlideBoundary - viewPortHeight) && --currentSlide < 1) {
                currentSlide = 1;
            }
        }

    // Scroll direction bottom.
    } else {

        // Calculate nextSlide opacity while scroll down.
        let nextSlideOpacity = 1 - (pageYNew / viewPortHeight - (currentSlide - 1));
        let nextSlideOverlay = slides[currentSlide].querySelector('.detached-screen_overlay');
        nextSlideOverlay.style.opacity = nextSlideOpacity;

        // Make current slide scrollable.
        if (pageYNew >= currentSlideBoundary) {
            slides[currentSlide].style.position = 'absolute';
            slides[currentSlide].style.top = currentSlideBoundary + 'px';

            // Switch to next slide.
            if (currentSlide < (slides.length - 1)) {
                currentSlide++;
            }
        }
    }

    pageYOld = pageYNew;
};
scrollSlides = _.throttle(scrollSlides, 10);

window.addEventListener('scroll', scrollSlides);

