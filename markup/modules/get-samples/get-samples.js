import $ from 'jquery';
import * as validator from 'static/js/plugins/jquery.validate.min.js';

const $samplesForm = $('.samples-form');
const $submitBtn = $('.samples-submit_btn');
const $tnxText = $('.order-submit_tnx');

$samplesForm.validate({
    rules: {
        name: {
            required: true
        },
        email: {
            required: true
        },
        phone: {
            required: true,
            numbers: true
        },
        message: 'required'
    },

    messages: {
        name: {
            required: 'пожалуйста, введите Ваше имя'
        },
        email: {
            required: 'пожалуйста, введите email'
        },
        phone: {
            required: 'пожалуйста, введите телефон'
        },
        message: 'пожалуйста, напишите сообщение'
    },

    invalidHandler: (e, _validator) => {
        console.log('err');
    },

    submitHandler: () => {
        submitOrder();
        $tnxText.fadeIn();
        setTimeout(() => $tnxText.fadeOut(), 3000);
    }

});


$samplesForm.on('submit', (e) => e.preventDefault());

function submitOrder() {
    console.log('subm');
    let dataObj = {};
    let $name = $('#name');
    let $company = $('#company');
    let $phone = $('#phone');
    let $email = $('#email');
    let $message = $('#message');

    dataObj.type = 'request';
    dataObj.name = $name.val();
    dataObj.company = $company.val();
    dataObj.phone = $phone.val();
    dataObj.email = $email.val();
    dataObj.message = $message.val();

    $name.val('');
    $company.val('');
    $phone.val('');
    $email.val('');
    $message.val('');

    $.ajax({
        type: 'POST',
        url: '/contact',
        data: dataObj
    });

}


