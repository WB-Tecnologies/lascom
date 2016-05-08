import $ from 'jquery';
import * as validator from 'static/js/plugins/jquery.validate.min.js';

const $orderForm = $('.order-form');
const $submitBtn = $('.order-submit_btn');
const $tnxText = $('.order-submit_tnx');

$.validator.addMethod('email', (value, element) => {
    return (/^(('[\w-\s]+'')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(value));
}
, 'неверный ввод');

$.validator.addMethod('alphabetical', (value, element) => {
    return (/^([а-яА-ЯёЁa-zA-Z]+)\s?([а-яА-ЯёЁa-zA-Z]+)$/.test(value));
}
, 'только буквы');

$.validator.addMethod('numbers', (value, element) => {
    return (/^\+?\d?\(?(\s?\(?([0-9]+)\)?\s?\-?\(?\)?)+([0-9]+)\)?$/.test(value));
}
, 'неверный ввод');

$orderForm.validate({
    rules: {
        name: {
            required: true,
            alphabetical: true
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


$orderForm.on('submit', (e) => e.preventDefault());

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
        url: 'http://127.0.0.1:5000/contact',
        data: dataObj
    });

}

