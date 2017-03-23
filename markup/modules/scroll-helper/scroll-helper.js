import throttle from 'lodash/throttle';
const $window = $(window);

initHeaderSubsectionToggle();

function initHeaderSubsectionToggle() {
    window.addEventListener('mousewheel', throttle(triggerScrollEvent, 200));
}

function triggerScrollEvent(e) {
    let scrollDirection = _getScrollDirection(e.wheelDelta);
    if (scrollDirection === 'top') {
        $window.trigger('scrollTop');
    } else {
        $window.trigger('scrollBottom');
    }
}

function _getScrollDirection(_delta) {
    return _delta > 0 ? 'top' : 'bottom';
}
