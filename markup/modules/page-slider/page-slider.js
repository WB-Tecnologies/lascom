const body = document.querySelector('body');
const slides = document.querySelectorAll('.detached-screen');

// Set body height by slides count.
let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
body.style.height = viewPortHeight * slides.length + 'px';

// Set z-index for slides.
for (let i = 0, length = slides.length, index = slides.length; i < length; i++) {
    slides[i].style.zIndex = (index--);
}

// Scroll slides.
let currentSlide = 0;
const scrollSlides = () => {
    if (window.pageYOffset >= currentSlide * viewPortHeight) {

        slides[currentSlide].active = true;
        slides[currentSlide].style.position = 'absolute';
        slides[currentSlide].style.top = currentSlide * viewPortHeight + 'px';
        if (currentSlide < (slides.length - 1)) {
            currentSlide++;
        }

    } else {
        slides[currentSlide].style.position = 'fixed';
        slides[currentSlide].style.top = 'initial';
        currentSlide--;

    }
};
window.addEventListener('scroll', scrollSlides);

