import _ from 'lodash';
import $ from 'jquery';

const slides = document.querySelectorAll('.detached-screen');
let $menuIndexElements = $('.header-nav-list_link, .header-fixed_btn, .greeting-content_btn, .ulsp-content_btn, .ulsp-header_btn');
let slidesOffset = {};

initSliderHeight();

$menuIndexElements.on('click', scrollToScreen);

function scrollToScreen(e) {
    e.preventDefault();
    let slideToScroll = $(this).data('slide');
    $('html, body').animate({
        scrollTop: slidesOffset[slideToScroll]
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
