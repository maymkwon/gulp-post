$(document).ready(function(){
    $(window).scroll(function() {

        if ($(window).scrollTop() > 100) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
    });
    var $transitionImg = $('.content-img img');
    $transitionImg.css({
        'transform' : 'translateY(0px)',
        'opacity' : '1'
    });
});
