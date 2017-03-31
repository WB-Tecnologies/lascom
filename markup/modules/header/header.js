import $ from 'jquery';

const $window = $(window);
const $html = $('html');
const $body = $('body');
const $menuBtn = $('.mobile-close-btn__menu, .header-fixed_menu-btn, .l-section_overlay, .mobile-menu .header-nav-list_link, .mobile-menu .header-fixed_btn, .ulsp-header_btn');
const $orderBtn = $('.header-nav-list_link__order, .greeting-content_order-btn');
const $orderModal = $('.modal-screen__order');
const $anchorsNav = $('.anchors-nav');
const $navLinks = $('.anchors-nav-list_link');

$menuBtn.on('click', toggleMenu);
$orderBtn.on('click', openOrder);
$orderModal.on('click', closeOrder);
$window.on('scrollTop', headerSubsectionShow);
$window.on('scrollBottom', headerSubsectionHide);
$window.on('slideChanged', setActiveNav);


function setActiveNav(e, slideNumber) {
    $navLinks.removeClass('anchors-nav-list_link__active');
    $(`.anchors-nav-list_link[data-slide=${slideNumber}]`).addClass('anchors-nav-list_link__active');
}


function toggleMenu() {
    $html.toggleClass('mob-menu-active');
}

function openOrder(e) {
    e.preventDefault();
    $body.addClass('no-scroll');
    $orderModal.addClass('modal-screen__active');
    $window.trigger('orderIsOpen');
}

function closeOrder(e) {
    let targetClassList = e.target.classList;
    if (targetClassList.contains('l-restrictor') || targetClassList.contains('modal-screen__active')) {
        $body.removeClass('no-scroll');
        $orderModal.removeClass('modal-screen__active');
        $window.trigger('orderIsClose');
    }
}

function headerSubsectionHide() {
    $anchorsNav.addClass('anchors-nav_hidden');
}

function headerSubsectionShow() {
    $anchorsNav.removeClass('anchors-nav_hidden');
}






























