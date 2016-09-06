console.log('here');
const $body = $('body');
const scrollTopBtn = $('.scrolltop-btn');

scrollTopBtn.on('click', scrollTop);

function scrollTop() {
    console.log('dsds');
    $body.animate({'scrollTop': 0}, 800);
}
