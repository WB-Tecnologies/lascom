import _ from 'lodash';
import $ from 'jquery';
import {getParalxMaxScroll} from '../page-slider/page-slider.js';

const MOBILE_SIZE = 768;
const SLIDE_PARALAX = 4;
const HEADER_HEIGHT = 60;
const slides = document.querySelectorAll('.detached-screen');
let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

let $paralaxContent = $('.usage-paralax');
let $menuIndexElements = $('.anchors-nav-list_link, .header-fixed_btn, .greeting-content_btn, .ulsp-content_btn, .ulsp-header_btn');
let slidesOffset = {};
window.initSliderHeightForMenu = initSliderHeight;

initSliderHeight();

$menuIndexElements.on('click', scrollToScreen);

function scrollToScreen(e) {
    e.preventDefault();
    let slideToScroll = $(this).data('slide');
    let sclollHeight = slidesOffset[slideToScroll];

    if (viewPortWidth <= MOBILE_SIZE) {
        sclollHeight -= HEADER_HEIGHT;
    }

    $('html, body').animate({
        scrollTop: sclollHeight
    }, 300);
}

function initSliderHeight() {
    let currentSlideBoundary = 0;
    _.forEach(slides, (slide, i) => {
        currentSlideBoundary += slide.clientHeight - 1;
        slidesOffset[i] = currentSlideBoundary;
    });
    slidesOffset.top = 0;
}
