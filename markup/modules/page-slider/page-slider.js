import _ from 'lodash';

const SLIDE_BEFORE_PARALAX = 2;
const SLIDE_PARALAX = 3;
const paralaxContent = document.querySelector('.usage-paralax');
const slides = document.querySelectorAll('.detached-screen');
const scrollSlidesThrottled = _.throttle(scrollSlides, 10);
let getCurentSlideBoundary = сurentSlideBoundaryFactory();
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let currentSlide = 1;
let pageYOld = window.pageYOffset;
let getSlideOverlayMemo = _.memoize(getSlideOverlay);

initialize();

function initialize() {
    initSliderHeight();
    // document.querySelector('body').style.height = getCurentSlideBoundary(slides.length) + 'px';
    // scrollSlides();
    window.addEventListener('scroll', scrollSlidesThrottled);
}

function initSliderHeight() {
    _.forEach(slides, (slide, index) => {
        slide.style.zIndex = index;
        slide.style.opacity = 1;
        slide.style.top = getCurentSlideBoundary(index) + 'px';
        slide.dataTop = getCurentSlideBoundary(index);
    });
}

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

function getSlideOpacity(_pageYNew, _currentSlide) {
    return _pageYNew / viewPortHeight - (_currentSlide - 1);
}

function getSlideOverlay(element) {
    return element.querySelector('.detached-screen_overlay');
}

function updateSlideOpacity(slide, slideOpacity) {
    slide.style.opacity = slideOpacity;

    if (slideOpacity < 0.1) {
        slide.classList.add('detached-screen_overlay__transparent');
    } else {
        slide.classList.remove('detached-screen_overlay__transparent');
    }
}

function updateParalaxPosition(_currentSlide, scrolledSlice) {
    if (!paralaxContent) {
        return;
    }

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
    let heightDelta = slides[currentSlide].clientHeight - viewPortHeight;
    let pageYNew = window.pageYOffset;

    // Scroll direction top.
    if (pageYOld > pageYNew) {
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide);
        let slideOverlay = getSlideOverlayMemo(slides[currentSlide - 1]);
        updateSlideOpacity(slideOverlay, slideOpacity);
        updateParalaxPosition(currentSlide, slideOpacity);

        // Set current slide fixed.
        if (pageYNew < (currentSlideBoundary + heightDelta)) {
            slides[currentSlide].style.position = 'absolute';
            slides[currentSlide].style.top = slides[currentSlide].dataTop + 'px';

            // Switch slide when upslide overlay it.
            if (pageYNew < (currentSlideBoundary - viewPortHeight) && --currentSlide < 1) {
                currentSlide = 1;
            }
        }

    // Scroll direction bottom.
    } else {
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide);
        let slideOverlay = getSlideOverlayMemo(slides[currentSlide - 1]);
        updateSlideOpacity(slideOverlay, slideOpacity);
        updateParalaxPosition(currentSlide, slideOpacity);

        // Make current slide scrollable.
        if (pageYNew >= (currentSlideBoundary + heightDelta) && slides[currentSlide + 1]) {
            slides[currentSlide].style.position = 'fixed';
            slides[currentSlide].style.top = -heightDelta + 'px';
            currentSlide++;
        }
    }

    pageYOld = pageYNew;
}
