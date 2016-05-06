import $ from 'jquery';

const $body = $('body');
const $menuBtn = $('.header-fixed_menu-btn, .l-section_overlay, .mobile-menu .header-nav-list_link, .mobile-menu .header-fixed_btn');

$menuBtn.on('click', toggleMenu);

function toggleMenu() {
    $body.toggleClass('mob-menu-active');
}


