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
        id: 'Рабочая поверхность',
        color: '#c4cb8a',
        src: 'static/img/plugins/machine/machine.{{01}}.svg'
    },
    {
        id: 'Blend',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-blend.{{01}}.svg'
    },
    {
        id: 'Belts',
        color: '#2f2',
        src: 'static/img/plugins/machine/machine-belts.{{01}}.svg'
    },
    {
        id: 'Cooling',
        color: '#228',
        src: 'static/img/plugins/machine/machine-cooling.{{01}}.svg'
    },
    {
        id: 'Laser',
        color: '#34ff86',
        src: 'static/img/plugins/machine/machine-laser.{{01}}.svg'
    },
    {
        id: 'Motors',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-motors.{{01}}.svg'
    },
    {
        id: 'Stops',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-stops.{{01}}.svg'
    }]
});

