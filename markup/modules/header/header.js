import _ from 'lodash';

const header = document.getElementsByClassName('header')[0];

fixedHeaderInit();

function fixedHeaderInit() {
    if (header) {
        const headerFixed = document.getElementsByClassName('header-fixed')[0];
        const headerHeight = header.clientHeight;

        // Toggle header fixed/static position.
        let setHeader = () => {
            if (window.pageYOffset > headerHeight) {
                if (!headerFixed.classList.contains('header-fixed__active')) {
                    headerFixed.classList.add('header-fixed__active');
                }
            } else {
                if (headerFixed.classList.contains('header-fixed__active')) {
                    headerFixed.classList.remove('header-fixed__active');
                }
            }
        };
        setHeader = _.throttle(setHeader, 200);

        window.addEventListener('scroll', setHeader);
    }
}
