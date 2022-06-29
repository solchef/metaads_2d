/*!
 * Start Bootstrap - Bare v5.0.7 (https://startbootstrap.com/template/bare)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

/* animate smooth scrolling sections */

$("div a[href^='#']").on('click', function(e) {

    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 700, function() {

        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = hash;
    });

});
/* OFF CANVAS */
$('.js-open').on('click', function() {
    var target = $(this).attr('data-target');
    $(target).toggleClass('is-visible');
});

$('.js-close').on('click', function() {
    $(this).parent().removeClass('is-visible');
});