import $ from 'jquery';
import * as validator from 'static/js/plugins/jquery.validate.min.js';

const $samplesForm = $('.samples-form');
const $submitBtn = $('.samples-submit_btn');

$samplesForm.validate({
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

// $samplesForm.on('submit', (e) => {
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


