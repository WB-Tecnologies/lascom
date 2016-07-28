import _ from 'lodash';
import $ from 'jquery';

const SLIDE_BEFORE_PARALAX = 3;
const SLIDE_PARALAX = 4;
const MOBILE_SIZE = 768;
const LASER_VIDEO_SLIDE = 3;
const paralaxContent = document.querySelector('.usage-paralax');
const slides = document.querySelectorAll('.detached-screen');
const scrollSlidesDebounced = _.throttle(scrollSlides, 0);
const $body = $('body');
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
let paralaxScrollMax = getParalxMaxScroll();
let paralaxSpeed = 45;
let currentMenu;
let laserVideo = $('.laser-videobg')[0];
let videoIsPlay = false;
let currentSlideBoundary = getCurentSlideBoundary(currentSlide);
let heightDelta = 0;
let scrolledPercent = 0;
let updateParalaxPositionThrottled = _.throttle(updateParalaxPosition, 10);
window.initialize = initialize;

initialize();

function initialize() {
    if (viewPortWidth > MOBILE_SIZE) {
        updateMenuInit();
        initSliderHeight();
        scrollSlides();
        window.addEventListener('scroll', scrollSlidesDebounced);
    }
}

function initSliderHeight() {
    _.forEach(slides, (slide, index) => {
        let slideInitStyles = 'top:' + getCurentSlideBoundary(index) + 'px;opacity:1;z-index:' + index + ';';
        slide.style.cssText = slideInitStyles;
        slide.dataTop = getCurentSlideBoundary(index);
    });
}

export function getParalxMaxScroll() {
    let paralaxContentWidth = 0;
    _.forEach($paralaxContent.children(), (child) => {
        paralaxContentWidth += child.clientWidth;
    });

    return paralaxContentWidth;
}

function сurentSlideBoundaryFactory() {
    let cache = {};

    return (_currentSlide) => {
        // Return result from cache if any.
        if (cache[_currentSlide]) {
            return cache[_currentSlide];
        }

        // Calculate result.
        let _currentSlideBoundary = 0;
        _.forEach(slides, (slide, i) => {
            _currentSlideBoundary += slide.clientHeight;
            if ($paralaxContent.length && i + 1 === SLIDE_PARALAX) {
                _currentSlideBoundary += paralaxScrollMax - $paralaxContent.width();
            }
            cache[i + 1] = _currentSlideBoundary;
        });
        return cache[_currentSlide];
    };
}

function getSlideOpacity(_pageYNew, _currentSlide) {
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
    if (!paralaxContent) {
        return;
    }

    scrolledSlice = scrolledSlice.toFixed(2);

    if (_currentSlide === SLIDE_BEFORE_PARALAX) {
        scrolledPercent = 100 - (1 + parseFloat(scrolledSlice, 10)).toFixed(2) * 100;
        if (scrolledPercent < 0) {
            $paralaxWrapper.scrollLeft(paralaxScrollMax / 100 * Math.abs(scrolledPercent));
        }
    } else if (_currentSlide === SLIDE_PARALAX && scrolledSlice < 0) {
        scrolledPercent = (1 + parseFloat(scrolledSlice, 10)).toFixed(2) * 100;
        $paralaxWrapper.scrollLeft(paralaxScrollMax / 100 * scrolledPercent);
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
    if (currentSlide > 2) {
        $body.addClass('sticky-header');
    } else {
        $body.removeClass('sticky-header');
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
    }
}

function playLaserVideo(_currentSlide) {
    if (_currentSlide === LASER_VIDEO_SLIDE) {
        if (!videoIsPlay) {
            laserVideo.play();
            videoIsPlay = true;
        }
    } else {
        if (videoIsPlay) {
            laserVideo.pause();
            videoIsPlay = false;
        }
    }
}

const anchorNav = document.querySelector('.anchors-nav');
const anchorNavBottom = document.querySelector('.anchors-nav').getBoundingClientRect().bottom;
function toggleSecondaryMenu(_currentSlideNumber) {
    let secondSlideTop = slides[_currentSlideNumber].getBoundingClientRect().top;
    if (secondSlideTop < anchorNavBottom) {
        anchorNav.classList.add('anchors-nav__active');
    } else {
        anchorNav.classList.remove('anchors-nav__active');
    }
}

function scrollSlides() {
    let pageYNew = window.pageYOffset;

    if (laserVideo) {
        playLaserVideo(currentSlide);
    }

    if (currentSlide === 2) {
        toggleSecondaryMenu(currentSlide);
    }

    // Scroll direction top.
    if (pageYOld > pageYNew) {
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide);
        let slideOverlay = getSlideOverlayMemo(slides[currentSlide - 1]);
        updateParalaxPositionThrottled(currentSlide, slideOpacity);

        // Set current slide fixed.
        if (pageYNew < (currentSlideBoundary + heightDelta)) {
            slides[currentSlide].style.position = 'absolute';
            slides[currentSlide].style.top = slides[currentSlide].dataTop + 'px';

            // Switch slide when upslide overlay it.
            if (pageYNew < (currentSlideBoundary - viewPortHeight)) {
                currentSlide = (currentSlide - 1) || 1;
                currentSlideBoundary = getCurentSlideBoundary(currentSlide);
                heightDelta = slides[currentSlide].clientHeight - viewPortHeight;
            }
        }

    // Scroll direction bottom.
    } else {
        let slideOpacity = getSlideOpacity(pageYNew, currentSlide);
        let slideOverlay = getSlideOverlayMemo(slides[currentSlide - 1]);
        updateParalaxPositionThrottled(currentSlide, slideOpacity);

        // Make current slide scrollable.
        if (pageYNew >= (currentSlideBoundary + heightDelta) && slides[currentSlide + 1]) {
            slides[currentSlide].style.position = 'fixed';
            slides[currentSlide].style.top = -heightDelta + 'px';
            currentSlide++;
            currentSlideBoundary = getCurentSlideBoundary(currentSlide);
            heightDelta = slides[currentSlide].clientHeight - viewPortHeight;
        }
    }

    pageYOld = pageYNew;
    // updateMenu();
}

