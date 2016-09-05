const laserFullVideo = document.querySelector('.laser-videobg__full');

if (laserFullVideo) {
    laserFullVideoInit();
}

function laserFullVideoInit() {
    setTimeout(() => {
        laserFullVideo.pause();
        laserFullVideo.muted = false;
    }, 1000);
}
