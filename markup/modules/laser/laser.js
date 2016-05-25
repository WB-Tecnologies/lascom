let soundBtn = $('.laser-sound-btn');
let videoBackBtn = $('.video-back');
let videoScreen = $('.detached-screen__laser');
let laserVideo = $('.laser-videobg')[0];

soundBtn.on('click', firstPlanVideo);
videoBackBtn.on('click', backPlanVideo);

function firstPlanVideo() {
    videoScreen.addClass('detached-screen__video');
    laserVideo.muted = false;
}

function backPlanVideo() {
    videoScreen.removeClass('detached-screen__video');
    laserVideo.muted = true;
}
