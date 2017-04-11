const $body = $('body');
const scrollTopBtn = $('.scrolltop-btn');

scrollTopBtn.on('click', scrollTop);

function scrollTop() {
    $body.animate({'scrollTop': 0}, 800);
    $.fn.fullpage.moveTo(1);
}
