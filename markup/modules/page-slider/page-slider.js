import _ from 'lodash';

const body = document.querySelector('body');
const slides = document.querySelectorAll('.detached-screen');

// Set body height by slides count.
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
body.style.height = viewPortHeight * slides.length + 'px';

// Set z-index for slides.
for (let i = 0, length = slides.length, index = slides.length; i < length; i++) {
    slides[i].style.zIndex = (index--);
    slides[i].style.display = 'block';
}

// Scroll slides.
let currentSlide = 1;
let pageYOld = window.pageYOffset;
let scrollSlides = () => {
    // Scroll direction top.
    if (pageYOld > window.pageYOffset) {
        if (window.pageYOffset < currentSlide * viewPortHeight) {
            slides[currentSlide].style.position = 'fixed';
            slides[currentSlide].style.top = 'initial';
            if (--currentSlide < 1) {
                currentSlide = 1;
            }
        }

    // Scroll direction bottom.
    } else {
        if (window.pageYOffset >= currentSlide * viewPortHeight) {
            slides[currentSlide].style.position = 'absolute';
            slides[currentSlide].style.top = currentSlide * viewPortHeight + 'px';
            if (currentSlide < (slides.length - 1)) {
                currentSlide++;
            }
        }
    }
    pageYOld = window.pageYOffset;
};
scrollSlides = _.throttle(scrollSlides, 50);

window.addEventListener('scroll', scrollSlides);

