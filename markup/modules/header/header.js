import $ from 'jquery';

const $window = $(window);
const $html = $('html');
const $body = $('body');
const $htmlbody = $('html, body');
const $mobileNav = $('.mobile-menu');
const $content = $('.header-fixed, .detached-screen');
const $menuOpenBtn = $('.mobile-close-btn__menu, .header-fixed_menu-btn, .l-section_overlay, .mobile-menu .header-nav-list_link, .mobile-menu .header-fixed_btn, .ulsp-header_btn');
const $menuCloseBtn = $('.mobile-close-btn__menu');
const $orderBtn = $('.header-nav-list_link__order, .greeting-content_order-btn');
const $orderModal = $('.modal-screen__order');
const $anchorsNav = $('.anchors-nav');
const $navLinks = $('.anchors-nav-list_link');
let touchStart = 0;
let touchDelta = 0;

$('.header-fixed').on('click', hideMenuByArea);
$menuOpenBtn.on('click', openNav);
$menuCloseBtn.on('click', closeNav);
$orderBtn.on('click', openOrder);
$orderModal.on('click', closeOrder);
$window.on('scrollTop', headerSubsectionShow);
$window.on('scrollBottom', headerSubsectionHide);
$window.on('slideChanged', setActiveNav);
initMobNavDrag();

function openNav() {
    $html.addClass('mob-menu-active');
    $mobileNav.css('transform', 'translateX(0)');
    $content.css('transform', 'translateX(-320px)');
    touchDelta = 0;
}

function closeNav() {
    $html.removeClass('mob-menu-active');
    $mobileNav.css('transform', 'translateX(320px)');
    $content.css('transform', 'translateX(0)');
    touchDelta = 0;
}

function initMobNavDrag() {
    $mobileNav.on('touchstart', enableDrag);
    $mobileNav.on('touchend', disableDrag);
}

function enableDrag(e) {
    touchStart = e.originalEvent.touches[0].pageX;
    $mobileNav.on('touchmove', handleDrag);
}

function disableDrag() {
    $mobileNav.off('touchmove', handleDrag);
    if (touchDelta > 150) {
        closeNav();
    } else if (touchDelta) {
        openNav();
    }
}

function handleDrag(e) {
    touchDelta = e.originalEvent.touches[0].pageX - touchStart;
    if (touchDelta < 0 ) {
        touchDelta = 0;
    }
    $mobileNav.css('transform', 'translateX(' + touchDelta + 'px)');
    $content.css('transform', 'translateX(' + (-320 + touchDelta) + 'px)');
}


function hideMenuByArea(e) {
    let eClassList = e.target.classList;
    let notNavBtn = !eClassList.contains('header-fixed_menu-btn') && !eClassList.contains('header-fixed_menu-btn_row');
    if (notNavBtn) {
        closeNav();
    }
}

function setActiveNav(e, slideNumber) {
    $navLinks.removeClass('anchors-nav-list_link__active');
    $(`.anchors-nav-list_link[data-slide=${slideNumber}]`).addClass('anchors-nav-list_link__active');
}

function openOrder(e) {
    e.preventDefault();
    $htmlbody.addClass('no-scroll');
    $orderModal.addClass('modal-screen__active');
    $window.trigger('orderIsOpen');
    closeNav();
}

function closeOrder(e) {
    let targetClassList = e.target.classList;
    if (targetClassList.contains('l-restrictor') || targetClassList.contains('modal-screen__active')) {
        $htmlbody.removeClass('no-scroll');
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






























