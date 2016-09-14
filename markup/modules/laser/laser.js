let $body = $('body');
let soundBtn = $('.laser-sound-btn');
let fullVideoWrapper = $('.laser-videobg-full-wrapper');
let laserFullVideo = document.querySelector('.laser-videobg__full');
let videoBackBtn = $('.laser-full-close');

soundBtn.on('click', laserFullVideoStart);
videoBackBtn.on('click', laserFullVideoStop);

function laserFullVideoStart() {
    fullVideoWrapper.addClass('laser-videobg-full-wrapper__active');
    $body.addClass('no-scroll');
    laserFullVideo.play();
}

function laserFullVideoStop() {
    fullVideoWrapper.removeClass('laser-videobg-full-wrapper__active');
    $body.removeClass('no-scroll');
    laserFullVideo.pause();
}
