import * as formStyler from 'static/js/plugins/formStyler.js';
import * as rotator from 'static/js/plugins/rotator.js';
import * as rotatorl10n from 'static/js/plugins/rotator.l10n.js';

$('#machine-layout').wbtRotator({
    language: 'en',
    src: 'static/img/plugins/machine/machine.{{01}}.jpg',
    sort: false,
    circular: true,
    autoLoad: true,
    legendDescriptions: false,
    theme: {
        text: '#999',
        hover: '#bbb',
        active: '#fff',
        background: '#161616'
    },
    masks: [{
        id: 'Human Skull',
        color: '#c4cb8a',
        src: 'static/img/plugins/machine/machine.{{01}}.svg'
    }]
});

