
$(window).scroll(function() {

    if ($(window).scrollTop() > 100) {
        $('.header').addClass('sticky');
    } else {
        $('.header').removeClass('sticky');
    }
});
var transitionImg = $('.content-img img');
$('.content-img img.main').css({
    'transform' : 'translateY(0px)',
    'opacity' : '1'
});
$('.content-img img.detail').css({
    'transform' : 'translateY(0px)',
    'opacity' : '1'
});
