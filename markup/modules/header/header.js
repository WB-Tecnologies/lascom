import $ from 'jquery';

const $html = $('html');
const $menuBtn = $('.mobile-close-btn__menu, .header-fixed_menu-btn, .l-section_overlay, .mobile-menu .header-nav-list_link, .mobile-menu .header-fixed_btn, .ulsp-header_btn');

$menuBtn.on('click', toggleMenu);

function toggleMenu() {
    $html.toggleClass('mob-menu-active');
}


