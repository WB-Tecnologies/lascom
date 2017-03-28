import debounce from 'lodash/debounce';
const $window = $(window);

initHeaderSubsectionToggle();

function initHeaderSubsectionToggle() {
    window.addEventListener('mousewheel', debounce(triggerScrollEvent, 200, {
        leading: true
    }));
}

function triggerScrollEvent(e) {
    let scrollDirection = getScrollDirection(e.wheelDelta);
    if (scrollDirection === 'top') {
        $window.trigger('scrollTop');
    } else {
        $window.trigger('scrollBottom');
    }
}

function getScrollDirection(_delta) {
    return _delta > 0 ? 'top' : 'bottom';
}
