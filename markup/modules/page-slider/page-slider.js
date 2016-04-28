import _ from 'lodash';

const body = document.querySelector('body');
const slides = document.querySelectorAll('.detached-screen');
let slidesOverlays = [];

// Set z-index for slides.
let index = slides.length;
_.forEach(slides, (slide) => {
    slide.style.zIndex = (index--);
    slide.style.display = 'block';
    slidesOverlays.push(slide.querySelector('.detached-screen_overlay'));
});

// Get current slide boundary.
let getCurentSlideBoundary = () => {
    let cache = {};

    return (_currentSlide) => {

        // Return result from cache if any.
        if (cache[_currentSlide]) {
            return cache[_currentSlide];
        }

        // Calculate result.
        let currentSlideBoundary = 0;
        _.forEach(slides, (slide, i) => {
            currentSlideBoundary += slide.clientHeight;
            cache[i + 1] = currentSlideBoundary;
        });
        return cache[_currentSlide];
    };
};
getCurentSlideBoundary = getCurentSlideBoundary();

// Set body height.
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let bodyHeight = getCurentSlideBoundary(slides.length);
body.style.height = bodyHeight + 'px';

// Scroll slides.
let currentSlide = 1;
let pageYOld = window.pageYOffset;

// Set slide overlay opacity.
let setSlideOpacity = (_pageYNew, _currentSlide) => {
    let nextSlideOpacity = 1 - (_pageYNew / viewPortHeight - (_currentSlide - 1));
    slidesOverlays[currentSlide].style.opacity = nextSlideOpacity;
    if (nextSlideOpacity < 0.1) {
        slidesOverlays[currentSlide].classList.add('detached-screen_overlay__transparent');
    } else {
        slidesOverlays[currentSlide].classList.remove('detached-screen_overlay__transparent');
    }
};

let scrollSlides = () => {
    let currentSlideBoundary = getCurentSlideBoundary(currentSlide);
    let pageYNew = window.pageYOffset;

    // Scroll direction top.
    if (pageYOld > pageYNew) {
        setSlideOpacity(pageYNew, currentSlide);

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
        setSlideOpacity(pageYNew, currentSlide);

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
scrollSlides();

window.addEventListener('scroll', scrollSlides);

