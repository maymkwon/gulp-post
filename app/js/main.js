(function($) {
    $(document).ready(function(){
        $(window).scroll(function() {

            if ($(window).scrollTop() > 100) {
                $('.header').addClass('sticky');
            } else {
                $('.header').removeClass('sticky');
            }

            var wScroll = $(this).scrollTop();
            var function_list =  $('.function').offset().top - ($(window).height() / 1.2);
            if (wScroll > function_list) {
                $('.function-list li').each(function(i){
                    setTimeout(function(){
                        $('.function-list li').eq(i).addClass('showing');
                    }, 150 * (i+1));
                });
                $('.function-add img').addClass('showing');
            }
        });
        var $transitionImg = $('.content-img img');
        $transitionImg.css({
            'transform' : 'translateY(0px)',
            'opacity' : '1'
        });

        $('.form-list-wrap > li:eq(0)').addClass('active').next().slideDown();
        $('.form-list-wrap .form-subject').click(function(j) {
            var dropDown = $(this).closest('.form-list').find('.form-content');

            $(this).closest('.form-list-wrap').find('.form-content').not(dropDown).slideUp();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.form-list-wrap').find('.form-list .active').removeClass('active');
                $(this).addClass('active');
            }
            dropDown.stop(false, true).slideToggle();
            j.preventDefault();
        });

        $(".pagination a").click(function() {
          $(".pagination a").removeClass("active");
          $(this).addClass("active");
        });
    });

})(jQuery);
