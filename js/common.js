
/** Изоляция */
var mobile=(/iphone|iemobile|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));



$( document ).ready(function() {



    $(function(preloading) {
        $('.preloader').show();
        setTimeout(function() {
            $('.preloader').hide();
        }, 2000);
    });



// object-fit for ie

    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);

    if(ie) {
        $('img.featured-image').parent().each(function () {
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('custom-object-fit');
            }
        });
    }







// burger

    $(".menu__burger").click(function () {
        $('.menu-burger').toggleClass("menu-burger_on");
        $('.menupanel').toggleClass("open");
    });
    $(document).mouseup(function(e){
        var div = $('.menu, .menupanel');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.menu-burger').removeClass("menu-burger_on");
            $('.menupanel').removeClass("open");
        }
    });




// fixed fooooooter


    var w = $(window).width();
    if (w >= 767) {
        var height = $('.bottom-containers').height(),
        marginCont = $('.containers-wrap');
        marginCont.css('margin-bottom', height);
    }
    $(window).resize(function() {
        var w = $(window).width(); // Получаем ширину окна
        if (w >= 767) {
            var height = $('.bottom-containers').height(),
            marginCont = $('.containers-wrap');
            marginCont.css('margin-bottom', height);
        }
    });




    // $(document).on('click', '.projs-tags__item', function (e) {
    //
    // });





// PP

    $(document).on('click', '.pp_', function (e) {
        e.preventDefault();
        var el = $(this);
        var th_pp = el.attr('data-pp');
            $('html,body').css('overflow', 'hidden');
            $('.pp').removeClass('show');
            $('.pp[data-pp="' + th_pp + '"]').addClass('show');
    });
    $(document).on('click', '.pp-cross, .pp-bg, .btn_cross', function () {
        $('.pp').removeClass('show');
        $('html,body').css('overflow', 'auto');
    });
    $(document).mouseup(function(e){
        var div = $('.pp');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.pp').removeClass('show');
            $('html,body').css('overflow', 'auto');
        }
    });
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            $('.pp').removeClass('show');
            $('html,body').css('overflow', 'auto');
        }
    };

    //

    $(document).on('click', '.pp_', function (e) {
        e.preventDefault();
        var el = $(this);
        var th_pp = el.attr('data-pp');
            $('.offers-pp').removeClass('show');
            $('.offers-pp[data-pp="' + th_pp + '"]').addClass('show');
            $('html,body').css('overflow', 'initial');
    });
    $(document).on('click', '.pp-cross, .pp-bg', function () {
        $('.offers-pp').removeClass('show');
        $('html,body').css('overflow', 'initial');
    });
    $(document).mouseup(function(e){
        var div = $('.offers-pp');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.offers-pp').removeClass('show');
            $('html,body').css('overflow', 'initial');
        }
    });
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            $('.pp').removeClass('show');
            $('html,body').css('overflow', 'auto');
        }
    };




// scrolltop button

    $(window).scroll(function () {
        var distanceTop = $('body').offset().top + 800;
        if ($(window).scrollTop() > distanceTop) {
            $('.totop').addClass('show');
        } else {
            $('.totop').removeClass('show');
        }
        var docH = (document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
        if ($(window).scrollTop() > docH - 1700) {
            $('.totop.show').addClass('bott');
        } else {
            $('.totop.show').removeClass('bott');
        }
    });
    $('.totop').click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
        $('.totop').removeClass('show');
    });






// заполнение инпута

    $('input, textarea').change(function(){
        input = $(this).val();
        if(input == '') {
            $(this).removeClass('val');
        } else {
            $(this).addClass('val');
        }
    });





// AOS

    AOS.init();



});
