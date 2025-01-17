import $ from 'jquery';
import 'static/js/plugins/no-scroll-helper.js';

const $window = $(window);
const $html = $('html');
const $body = $('body');
const $htmlbody = $('html, body');
const $mobileNav = $('.mobile-menu');
const mobileNavHalfWidth = $mobileNav.width() / 2;
const $content = $('.header-fixed, .detached-screen');
const $menuOpenBtn = $('.mobile-close-btn__menu, .header-fixed_menu-btn, .l-section_overlay, .mobile-menu .header-nav-list_link, .mobile-menu .header-fixed_btn, .ulsp-header_btn');
const $menuCloseBtn = $('.mobile-close-btn__menu');
const $orderBtn = $('.header-nav-list_link__order, .greeting-content_order-btn');
const $orderModal = $('.modal-screen__order');
const $anchorsNav = $('.anchors-nav');
const $navLinksDesktop = $('.anchors-nav__desktop .anchors-nav-list_link');
const $navLinksMobile = $('.mobile-menu .anchors-nav-list_link');
const headerHeight = $('.header-fixed').height();
const $equipmentBtn = $('.header-nav-list_equipment');
const $equipmentList = $('.header-nav-list_equipment-list');
let equipmentIsOpen;
let touchStart = 0;
let touchDelta = 0;

if (localStorage.equipmentIsOpen) {
    equipmentIsOpen = JSON.parse(localStorage.equipmentIsOpen);
}

$('.header-fixed').on('click', hideMenuByArea);
$menuOpenBtn.on('click', openNav);
$menuCloseBtn.on('click', closeNav);
$orderBtn.on('click', openOrder);
$orderModal.on('click', closeOrder);
$navLinksMobile.on('click', scrollToScreenMob);
$window.on('scrollTop', headerSubsectionShow);
$window.on('scrollBottom', headerSubsectionHide);
$window.on('slideChanged', setActiveNav);
$equipmentBtn.on('click', toggleEquipment);
initMobNavDrag();
keepEquipmentOpen();

function keepEquipmentOpen() {
    if (equipmentIsOpen) {
        $equipmentBtn.addClass('header-nav-list_equipment__active');
        $equipmentList.addClass('header-nav-list_equipment-list__active header-nav-list_equipment-list__static');
        setTimeout(() => {
            $equipmentList.removeClass('header-nav-list_equipment-list__static');
        }, 500);
    }
}

function toggleEquipment() {
    equipmentIsOpen = !equipmentIsOpen;
    localStorage.equipmentIsOpen = equipmentIsOpen;
    $equipmentBtn.toggleClass('header-nav-list_equipment__active');
    $equipmentList.toggleClass('header-nav-list_equipment-list__active');
}

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
    $mobileNav.removeClass('mobile-menu__static');
    if (touchDelta > mobileNavHalfWidth) {
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
    if (touchDelta) {
        $mobileNav.addClass('mobile-menu__static');
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
    $navLinksDesktop.removeClass('anchors-nav-list_link__active');
    $(`.anchors-nav-list_link[data-slide=${slideNumber}]`).addClass('anchors-nav-list_link__active');
}

function openOrder(e) {
    e.preventDefault();
    $htmlbody.addClass('no-scroll');
    $.fn.disableScroll();
    $orderModal.addClass('modal-screen__active');
    $window.trigger('orderIsOpen');
    closeNav();
}

function closeOrder(e) {
    let targetClassList = e.target.classList;
    if (targetClassList.contains('l-restrictor') || targetClassList.contains('modal-screen__active')) {
        $htmlbody.removeClass('no-scroll');
        $.fn.enableScroll();
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

function scrollToScreenMob(e) {
    $navLinksMobile.removeClass('anchors-nav-list_link__active');
    $(this).addClass('anchors-nav-list_link__active');
    let $slideToScroll = $('.' + $(e.target).data('slide'));
    let slideToScrollOffset = $slideToScroll.offset().top - headerHeight;

    $htmlbody.animate({scrollTop: slideToScrollOffset}, 400);
    closeNav();
}




























