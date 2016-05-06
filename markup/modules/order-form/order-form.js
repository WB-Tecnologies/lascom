import $ from 'jquery';
import * as validator from 'static/js/plugins/jquery.validate.min.js';
console.log($.validator);


const $contactForm = $('.order-form');
const $submitBtn = $('.order-submit_btn');


$.validator.addMethod('email', (value, element) => {
    return (/^(('[\w-\s]+'')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(value));
}
, 'please enter valid email');

$.validator.addMethod('alphabetical', (value, element) => {
    return (/^([a-zA-Z]+)\s?([a-zA-Z]+)$/.test(value));
}
, 'please enter characters only');

$.validator.addMethod('numbers', (value, element) => {
    return (/^([0-9]+)\s?([0-9]+)$/.test(value));
}
, 'please enter digits only');


$contactForm.validate({
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
            required: 'please enter name'
        },
        email: {
            required: 'please enter email'
        },
        phone: {
            required: 'please enter phone'
        },
        message: 'please enter message'
    },

    invalidHandler: (e, _validator) => {
        console.log('err');
    }
        // $submitBtn.addClass "contact-form_submit__error"
        // setTimeout ->
        //     $submitBtn.removeClass "contact-form_submit__error"
        // , 200
});


        // submitHandler: ->
        //     $submitTnxMessage.fadeIn()

// $contactForm.on('submit', (e) => {
//     e.preventDefault();
//     console.log('subm');
//     dataObj = {}
//     $name = $("#name")
//     $email = $("#email")
//     $company = $("#company")
//     $message = $("#message")

//     dataObj.name = $name.val()
//     dataObj.email = $email.val()
//     dataObj.company = $company.val()
//     dataObj.message = $message.val()

//     $name.val("")
//     $email.val("")
//     $company.val("")
//     $message.val("")

//     $.ajax
//         type: "POST"
//         url: "http://madmind.io/handler"
//         data: dataObj
// });

