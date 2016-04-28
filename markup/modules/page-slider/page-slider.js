import _ from 'lodash';

const SLIDE_BEFORE_PARALAX = 2;
const SLIDE_PARALAX = 3;
const paralaxContent = document.querySelector('.usage-paralax');
const body = document.querySelector('body');
const slides = document.querySelectorAll('.detached-screen');

// Set z-index for slides.
let index = slides.length;
_.forEach(slides, (slide) => {
    slide.style.zIndex = (index--);
    slide.style.display = 'block';
});

// Get current slide boundary.
function сurentSlideBoundaryFactory() {
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
}
let getCurentSlideBoundary = сurentSlideBoundaryFactory();

// Set body height.
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let bodyHeight = getCurentSlideBoundary(slides.length);
body.style.height = bodyHeight + 'px';

// Scroll slides.
let currentSlide = 1;
let pageYOld = window.pageYOffset;

// Get slide overlay opacity.
function getSlideOpacity(_pageYNew, _currentSlide) {
    return 1 - (_pageYNew / viewPortHeight - _currentSlide - 1);
}

// Get slide overlay element.
function getSlideOverlay(element) {
    return element.querySelector('.detached-screen_overlay');
}
let getSlideOverlayMemo = _.memoize(getSlideOverlay);

// Update slide opacity.
function updateSlideOpacity(slide, slideOpacity) {
    slide.style.opacity = slideOpacity;

    if (slideOpacity < 0.1) {
        slide.classList.add('detached-screen_overlay__transparent');
    } else {
        slide.classList.remove('detached-screen_overlay__transparent');
    }
}

// Update paralax position.
function updateParalaxPosition(_currentSlide, scrolledSlice) {
    if (_currentSlide === SLIDE_BEFORE_PARALAX) {
        scrolledSlice *= 100;
        paralaxContent.style.left = scrolledSlice + '%';
    } else if (_currentSlide === SLIDE_PARALAX) {
        scrolledSlice = scrolledSlice * 100 - 100;
        paralaxContent.style.left = scrolledSlice + '%';
    }
}

function scrollSlides() {
    let currentSlideBoundary = getCurentSlideBoundary(currentSlide);
    let pageYNew = window.pageYOffset;

    // Scroll direction top.
    if (pageYOld > pageYNew) {
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide);
        let slideOverlay = getSlideOverlayMemo(slides[currentSlide]);
        updateSlideOpacity(slideOverlay, slideOpacity);

        updateParalaxPosition(currentSlide, slideOpacity);

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
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide);
        let slideOverlay = getSlideOverlayMemo(slides[currentSlide]);
        updateSlideOpacity(slideOverlay, slideOpacity);

        updateParalaxPosition(currentSlide, slideOpacity);

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
}
scrollSlides();
const scrollSlidesThrottled = _.throttle(scrollSlides, 10);

window.addEventListener('scroll', scrollSlidesThrottled);

