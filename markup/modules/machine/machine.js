import * as formStyler from 'static/js/plugins/formStyler.js';
import * as rotator from 'static/js/plugins/rotator.js';
import * as rotatorl10n from 'static/js/plugins/rotator.l10n.js';

$('#machine-layout').wbtRotator({
    language: 'ru',
    src: 'static/img/plugins/machine/machine.{{01}}.jpg',
    sort: false,
    circular: true,
    autoLoad: true,
    legendDescriptions: true,
    theme: {
        text: '#999',
        hover: '#bbb',
        active: '#fff',
        background: '#161616'
    },
    masks: [{
        id: 'laser',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-laser.{{01}}.svg'
    },
    {
        id: 'scaner',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-laser.{{01}}.svg' // need scaner mask
    },
    {
        id: 'blend',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-blend.{{01}}.svg'
    },
    {
        id: 'motors',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-motors.{{01}}.svg'
    },
    {
        id: 'workingSurface',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-surface.{{01}}.svg'
    },
    {
        id: 'stops',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-stops.{{01}}.svg'
    },
    {
        id: 'safetySensors',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-stops.{{01}}.svg' // need safety sensors mask
    },
    {
        id: 'belts',
        color: '#f44',
        src: 'static/img/plugins/machine/machine-belts.{{01}}.svg'
    }
    // {
    //     id: 'Belts',
    //     color: '#2f2',
    //     src: 'static/img/plugins/machine/machine-belts.{{01}}.svg'
    // },
    // {
    //     id: 'Cooling',
    //     color: '#228',
    //     src: 'static/img/plugins/machine/machine-cooling.{{01}}.svg'
    // }
    ]
});

