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
let menuIndexElements = $('.anchors-nav__index .anchors-nav-list_link');
let menuMachineElements = $('.anchors-nav__ulsp .anchors-nav-list_link');
let $paralaxContent = $('.usage-paralax');
let $paralaxWrapper = $('.usage-paralax-wrapper');
let paralaxSpeed = 45;
let currentMenu;
let laserVideo = $('.laser-videobg')[0];
let videoIsPlay = false;
let currentSlideBoundary = getCurentSlideBoundary(currentSlide);
let heightDelta = 0;
let scrolledPercent = 0;
window.initialize = initialize;
const updateMenuThrottled = _.throttle(updateMenu, 500);

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
            cache[i + 1] = _currentSlideBoundary;
        });
        return cache[_currentSlide];
    };
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

function updateMenuInit() {
    if (menuIndexElements.length) {
        currentMenu = 'index';
    } else if (menuMachineElements.length) {
        currentMenu = 'machine';
    }
}

let currentSlideTop = 0;
let previousSlideMiddle = 0;
function updateIndexMenu() {
    currentSlideTop = slides[currentSlide].getBoundingClientRect().top;
    previousSlideMiddle = slides[currentSlide - 1].getBoundingClientRect().bottom * 0.9;
    if (currentSlideTop < previousSlideMiddle) {
        menuIndexElements.removeClass('anchors-nav-list_link__active');
        menuIndexElements[currentSlide - 2].classList.add('anchors-nav-list_link__active');
    } else {
        menuIndexElements.removeClass('anchors-nav-list_link__active');
    }
}

function updateMachineMenu() {
    let menuSlide = (currentSlide > 3) ? (currentSlide - 3) : (currentSlide - 2);
    currentSlideTop = slides[currentSlide].getBoundingClientRect().top;
    previousSlideMiddle = slides[currentSlide - 1].getBoundingClientRect().bottom * 0.9;
    if (currentSlideTop < previousSlideMiddle) {
        menuMachineElements.removeClass('anchors-nav-list_link__active');
        menuMachineElements[menuSlide].classList.add('anchors-nav-list_link__active');
    } else {
        menuMachineElements.removeClass('anchors-nav-list_link__active');
    }
}

export function updateMenu() {
    if (currentMenu === 'index') {
        updateIndexMenu();
    } else if (currentMenu === 'machine') {
        updateMachineMenu();
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


function scrollSlides() {
    let pageYNew = window.pageYOffset;

    if (laserVideo) {
        playLaserVideo(currentSlide);
    }

    // Scroll direction top.
    if (pageYOld > pageYNew) {

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
    updateMenuThrottled();
}

