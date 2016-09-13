import $ from 'jquery';

const $usageList = $('.usage-list');
const countSlides = $('.usage-list_item').length - 1;
const $leftScrollBtn = $('.scroll-bth-left');
const $rightScrollBtn = $('.scroll-bth-right');
let paralaxPosition = 0;

$leftScrollBtn.on('click', scrollParalax);
$rightScrollBtn.on('click', scrollParalax);

function scrollParalax() {
    let direction = $(this).data('direction');
    if (direction === 'left') {
        paralaxPosition = Math.min(paralaxPosition + 100, 0);
        $usageList.css('left', paralaxPosition + 'vw');
    } else if (direction === 'right') {
        paralaxPosition = Math.max(paralaxPosition - 100, -(countSlides) * 100);
        $usageList.css('left', paralaxPosition + 'vw');
    }

    if (paralaxPosition === -(countSlides) * 100) {
        $rightScrollBtn.hide();
        $leftScrollBtn.show();
    } else if (paralaxPosition === 0) {
        $leftScrollBtn.hide();
        $rightScrollBtn.show();
    } else {
        $leftScrollBtn.show();
        $rightScrollBtn.show();
    }
}
