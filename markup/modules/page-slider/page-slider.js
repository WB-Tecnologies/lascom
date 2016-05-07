import _ from 'lodash';
import $ from 'jquery';

const SLIDE_BEFORE_PARALAX = 3;
const SLIDE_PARALAX = 4;
const MOBILE_SIZE = 768;
const paralaxContent = document.querySelector('.usage-paralax');
const slides = document.querySelectorAll('.detached-screen');
const scrollSlidesThrottled = _.throttle(scrollSlides, 10);
let getCurentSlideBoundary = сurentSlideBoundaryFactory();
let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let currentSlide = 1;
let pageYOld = window.pageYOffset;
let getSlideOverlayMemo = _.memoize(getSlideOverlay);
let menuIndexElements = $('.header-nav-list__index .header-nav-list_link');
let menuMachineElements = $('.header-nav-list__machine .header-nav-list_link');
let $paralaxContent = $('.usage-paralax');
let $paralaxWrapper = $('.usage-paralax-wrapper');
let paralaxSpeed = 30;
let currentMenu;
window.initialize = initialize;

initialize();

function initialize() {
    if (viewPortWidth > MOBILE_SIZE) {
        updateMenuInit();
        initSliderHeight();
        scrollSlides();
        window.addEventListener('scroll', scrollSlidesThrottled);
    }
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
            if ($paralaxContent.length && i + 1 === SLIDE_PARALAX) {
                currentSlideBoundary += $paralaxContent.width() / 2;
            }
            cache[i + 1] = currentSlideBoundary;
        });
        return cache[_currentSlide];
    };
}

function getSlideOpacity(_pageYNew, _currentSlide, t) {
    return (_pageYNew) / viewPortHeight - (_currentSlide - 1);
}

function getSlideOverlay(element) {
    return element.querySelector('.detached-screen_overlay');
}

function updateSlideOpacity(slide, slideOpacity) {
    slide.style.opacity = slideOpacity;

    if (slideOpacity < 0.05) {
        slide.classList.add('detached-screen_overlay__transparent');
    } else {
        slide.classList.remove('detached-screen_overlay__transparent');
    }
}


function updateParalaxPosition(_currentSlide, scrolledSlice) {
    // scrolledSlice = Math.min(1, scrolledSlice);

    if (!paralaxContent) {
        return;
    }

    if (_currentSlide === SLIDE_BEFORE_PARALAX) {
        $paralaxWrapper.scrollLeft($paralaxWrapper.scrollLeft() - paralaxSpeed);
    } else if (_currentSlide === SLIDE_PARALAX) {
        $paralaxWrapper.scrollLeft($paralaxWrapper.scrollLeft() + paralaxSpeed);
    }
}

function updateMenuInit() {
    if (menuIndexElements.length) {
        currentMenu = 'index';
    } else if (menuMachineElements.length) {
        currentMenu = 'machine';
    }
}

function updateIndexMenu() {

    if (currentSlide === 5 || pageYOld === 0) {
        menuIndexElements.removeClass('header-nav-list_link__active');
    } else if (currentSlide === 6) {
        menuIndexElements.removeClass('header-nav-list_link__active');
        menuIndexElements[currentSlide - 2].classList.add('header-nav-list_link__active');
    } else {
        menuIndexElements.removeClass('header-nav-list_link__active');
        menuIndexElements[currentSlide - 1].classList.add('header-nav-list_link__active');
    }

}

function updateMachineMenu() {
    switch (currentSlide) {
        case 3:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide].classList.add('header-nav-list_link__active');
            break;
        case 4:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide - 1].classList.add('header-nav-list_link__active');
            break;
        case 5:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide - 1].classList.add('header-nav-list_link__active');
            break;
        case 6:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide - 1].classList.add('header-nav-list_link__active');
            break;
        case 7:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide - 1].classList.add('header-nav-list_link__active');
            break;
        case 8:
            menuMachineElements.removeClass('header-nav-list_link__active');
            break;
        case 9:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide - 2].classList.add('header-nav-list_link__active');
            break;

        default:
            menuMachineElements.removeClass('header-nav-list_link__active');
            menuMachineElements[currentSlide].classList.add('header-nav-list_link__active');
    }

    if (pageYOld === 0) {
        menuMachineElements.removeClass('header-nav-list_link__active');
        menuMachineElements[1].classList.add('header-nav-list_link__active');
    }


}

function updateMenu() {
    if (currentMenu === 'index') {
        updateIndexMenu();
    } else if (currentMenu === 'machine') {
        updateMachineMenu();
    }
}

function scrollSlides() {
    let currentSlideBoundary = getCurentSlideBoundary(currentSlide);
    let heightDelta = slides[currentSlide].clientHeight - viewPortHeight;
    let heightDeltaPrev = slides[currentSlide - 1].clientHeight - viewPortHeight;
    let pageYNew = window.pageYOffset;

    // Scroll direction top.
    if (pageYOld > pageYNew) {
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide, heightDeltaPrev);
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
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide, heightDeltaPrev);
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
    updateMenu();
}

