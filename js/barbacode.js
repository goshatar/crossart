$( document ).ready(function() {

    var FadeTransition = Barba.BaseTransition.extend({
        start: function() {

            $(function(preloading) {
                $('.preloader').show();
                setTimeout(function() {
                    $('.preloader').hide();
                }, 2000);
            });
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));

        },

        fadeOut: function() {

            return $(this.oldContainer).animate({
                opacity: 0
            }).promise();

        },

        fadeIn: function() {

            var _this = this;
            var $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility : 'visible',
                opacity : 0
            });

            $el.animate({ opacity: 1 }, 2000, function() {


                _this.done();
            });

            AOS.refreshHard();

        }
    });


    Barba.Pjax.getTransition = function() {
        return FadeTransition;
    };














    var index = Barba.BaseView.extend({
        namespace: 'index',

        onEnter: function() {

            $('.menu-logo').css('pointer-events', 'none');

        },
        onEnterCompleted: function() {


            $('head').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZEMWmP3G1NHuo9dpC8lmnvqHPmVSVxrE&callback=initMap" async="" defer="" id="wewe"></script>');

            $('.menu__proj').removeClass('hiddenonpage');


            // special-script --- start

            var galleryTop = new Swiper('.galls-slider', {
                center: true,
                items: 1,
                loop: true,
                autoplay: true,
                autoplay: {
                    delay: 8000,
                    disableOnInteraction: false,
                },
                nav: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                navText: [' ', ' '],
                dots: true,
                margin: 0,
                lazyLoad: true,
                on: {
                    slideChangeTransitionStart: function () {

                        var projname = $('.swiper-slide.swiper-slide-active').attr('data-projname'),
                            projtype = $('.swiper-slide.swiper-slide-active').attr('data-projtype'),
                            projlink = $('.swiper-slide.swiper-slide-active').attr('data-projlink');

                        $('.menu-proj').addClass('load');

                        setTimeout(function() {
                            $('.menu-proj__name span').text(projname);
                            $('.menu-proj__type span').text(projtype);
                            $('.menu-proj').attr('href', projlink);
                        }, 300);

                        setTimeout(function() {
                            $('.menu-proj').removeClass('load');
                        }, 500);




                    }
                }
            });
            var galleryThumbs = new Swiper('.galls-slider-r', {
                centeredSlides: true,
                navigation: false,
                loop: true,
                navigation: true,
                pagination: true,
                paginationHide: false,
                centeredSlides: true,
                loop: true,
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                }
            });
            galleryTop.controller.control = galleryThumbs;
            galleryThumbs.controller.control = galleryTop;



            // horiz

            var w = $(window).width();
            if (w >= 1023) {

                // ширина блоков в блоке со скроллом

                var wewe = $('.offers__info').width();
                $('.container_tasty .cols__info').css('width', wewe);

                var erer = $('.container_tasty .projs-card').width() + 32;
                var rtrt = $('.container_tasty .projs-card').length;
                var widtho = erer*rtrt;
                $('.cols__vis_projs').css('width', widtho);

                var comonwid = wewe + widtho + 400;
                $('.container_tasty .cols-cont').css('width', comonwid);


                // высота невидимого блока

                var tastyHeight = $('.container_tasty').height(), // высота блока-обертки
                    tastyWidth = $('.scroll-canvas').width(); // ширина скроллируемого полотна

                // применить значение ширины скроллируемого полотна к высоте невидимого блока, вычесть высоту обертки
                $('.container_tasty-ghost').css('height', tastyWidth - tastyHeight);

                //
                $('.scroll-canvas-cont').css({
                    "webkitTransform":'translateX(-' + tastyWidth + 'px)',
                    "MozTransform":'translateX(-' + tastyWidth + 'px)',
                    "msTransform":'translateX(-' + tastyWidth + 'px)',
                    "OTransform":'translateX(-' + tastyWidth + 'px)',
                    'transform':'translateX(-' + tastyWidth + 'px)'
                });

                $(window).scroll(function () {

                    var tasty = document.getElementById("container_tasty"),
                        tastyHeight = $('.container_tasty').height(), // высота блока-обертки
                        tastyWidth = $('.scroll-canvas').width(), // ширина скроллируемого полотна
                        ghostHeight = $('.container_tasty-ghost').height(), // высота невидимого блока (без блока-обертки)
                        commonHeights = tastyHeight + ghostHeight, // сумма высот блока-обертки и невидимого блока
                        tastyWidth = $('.container_tasty').width(),
                        ghostLine = document.getElementById("tasty-ghost-line"),
                        ghostLineTop = ghostLine.getBoundingClientRect().top,
                        tastyTop = tasty.getBoundingClientRect().top;


                    // движение полотна по оси Х

                    $('.scroll-canvas').css({
                        "webkitTransform":'translateX(' + ghostLineTop + 'px)',
                        "MozTransform":'translateX(' + ghostLineTop + 'px)',
                        "msTransform":'translateX(' + ghostLineTop + 'px)',
                        "OTransform":'translateX(' + ghostLineTop + 'px)',
                        'transform':'translateX(' + ghostLineTop + 'px)'
                    });

                    $('.slider-container_tasty').addClass('show-elements');



                });

            }
            if (w >= 1920) {
                var tastyWidthh = $('#scroll-canvas').width();
                console.log(tastyWidthh);
                $('#scroll-canvas').width(tastyWidthh + 200);
            }


            //
            // дублирование для ресайза

            $(window).resize(function() {

                var w = $(window).width();
                if (w >= 1023) {

                    // ширина блоков в блоке со скроллом

                    var wewe = $('.offers__info').width();
                    $('.container_tasty .cols__info').css('width', wewe);

                    var erer = $('.container_tasty .projs-card').width() + 32;
                    var rtrt = $('.container_tasty .projs-card').length;
                    var widtho = erer*rtrt;
                    $('.cols__vis_projs').css('width', widtho);

                    var comonwid = wewe + widtho + 400;
                    $('.container_tasty .cols-cont').css('width', comonwid);


                    // высота невидимого блока

                    var tastyHeight = $('.container_tasty').height(), // высота блока-обертки
                        tastyWidth = $('.scroll-canvas').width(); // ширина скроллируемого полотна

                    // применить значение ширины скроллируемого полотна к высоте невидимого блока
                    $('.container_tasty-ghost').css('height', tastyWidth - tastyHeight);

                    //
                    $('.scroll-canvas-cont').css({
                        "webkitTransform":'translateX(-' + tastyWidth + 'px)',
                        "MozTransform":'translateX(-' + tastyWidth + 'px)',
                        "msTransform":'translateX(-' + tastyWidth + 'px)',
                        "OTransform":'translateX(-' + tastyWidth + 'px)',
                        'transform':'translateX(-' + tastyWidth + 'px)'
                    });

                    $(window).scroll(function () {

                        var tasty = document.getElementById("container_tasty"),
                            tastyHeight = $('.container_tasty').height(), // высота блока-обертки
                            tastyWidth = $('.scroll-canvas').width(), // ширина скроллируемого полотна
                            ghostHeight = $('.container_tasty-ghost').height(), // высота невидимого блока (без блока-обертки)
                            commonHeights = tastyHeight + ghostHeight, // сумма высот блока-обертки и невидимого блока
                            tastyWidth = $('.container_tasty').width(),
                            ghostLine = document.getElementById("tasty-ghost-line"),
                            ghostLineTop = ghostLine.getBoundingClientRect().top,
                            tastyTop = tasty.getBoundingClientRect().top;


                        // движение полотна по оси Х

                        $('.scroll-canvas').css({
                            "webkitTransform":'translateX(' + ghostLineTop + 'px)',
                            "MozTransform":'translateX(' + ghostLineTop + 'px)',
                            "msTransform":'translateX(' + ghostLineTop + 'px)',
                            "OTransform":'translateX(' + ghostLineTop + 'px)',
                            'transform':'translateX(' + ghostLineTop + 'px)'
                        });

                        $('.slider-container_tasty').addClass('show-elements');

                    });

                }
                if (w >= 1920) {
                    var tastyWidthh = $('#scroll-canvas').width();
                    console.log(tastyWidthh);
                    $('#scroll-canvas').width(tastyWidthh + 200);
                }

            });


            // circles

            var circle = '<hgroup class="circle-load">' +
                '<svg width="26px" height="26px" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="13" cy="13" r="11" stroke-width="1.25" stroke="transparent" fill="none"></circle>' +
                '<circle cx="13" cy="13" r="11" stroke-width="1.25" stroke="#fff" fill="none" class="circle-load-svg"></circle>' +
                '</svg>' +
                '</hgroup>';
            $('.swiper-container.galls-slider-r .swiper-pagination-bullet').html(circle);


            // map - cities

            $(".map-cities__item").click(function () {
                $(".map-cities__item").removeClass('active');
                $(this).addClass('active');
            });


            //  hide projs on mainpage

            $(window).scroll(function() {
                if (window.pageYOffset >= 100) {
                    $('.menu__proj').addClass('hidden');
                } else {
                    $('.menu__proj').removeClass('hidden');
                }
            });
            if (window.pageYOffset >= 100) {
                $('.menu__proj').addClass('hidden');
            } else {
                $('.menu__proj').removeClass('hidden');
            }


            // special-script --- end


        },
        onLeave: function() {

            $('script[src^="https://maps.googleapis.com"]').remove();


        },
        onLeaveCompleted: function() {


        }
    });


    var projects = Barba.BaseView.extend({
        namespace: 'projects',

        onEnter: function() {


        },
        onEnterCompleted: function() {

            // фильтр проектов

            var projsFilter = function(){

                var $listToFilter = $('#projs-cards');
                var $allElements = $listToFilter.find('.projs-card_filt');
                var filterCache = {};

                function filterElements (filterClass) {

                    var $elemetnsToFilter;

                    if(filterCache.hasOwnProperty(filterClass)) {
                        $elemetnsToFilter = filterCache[filterClass];
                    } else {
                        $elemetnsToFilter = $listToFilter.find('.projs-card_filt[data-projs="' + filterClass + '"]');
                        filterCache[filterClass] = $elemetnsToFilter;
                    }

                    $elemetnsToFilter.css('display', 'block');

                }

                $('#projs-tags .projs-tags__item').click(function () {

                    var filterClass = $(this).attr('data-projs');

                    $(this).toggleClass('active');

                    $('.projs-card_filt').addClass('hide');
                    setTimeout(function () {
                        $('.projs-card_filt').removeClass('hide');
                    }, 600);

                    if ($(this).hasClass('projs-tags__item_all')) {

                        setTimeout(function () {
                            $('.projs-card_filt').show();
                        }, 500);

                        if ($(this).hasClass('active')) {

                            $('.projs-tags__item').removeClass('active');
                            $(this).addClass('active');

                        } else {

                            $(this).addClass('active');
                        }

                    } else {

                        $('.projs-tags__item_all').removeClass('active');

                        if ($(this).hasClass('active')) {

                            if ($('.projs-tags__item.active').length == 1) {

                                setTimeout(function () {
                                    $('.projs-card_filt').hide();
                                    filterElements(filterClass);
                                }, 500);

                            } else {

                                setTimeout(function () {
                                    filterElements(filterClass);
                                }, 500);
                            }

                        } else {

                            setTimeout(function () {
                                $('.projs-card_filt[data-projs="' + filterClass + '"]').hide();
                            }, 500);
                        }
                    }
                });

                $('.projs-card_filt').css('display', 'block');
            }
            projsFilter();

        },
        onLeave: function() {


        },
        onLeaveCompleted: function() {


        }
    });



    var project = Barba.BaseView.extend({
        namespace: 'project',

        onEnter: function() {


        },
        onEnterCompleted: function() {


            // fancybox

            $('.fancy').fancybox({
                padding:0,
                openEffect: 'fadeIn'
            });


            // 3d tour

            $('.proj-3d').click(function(){
                if(!$('#iframe').length) {
                    $('.pp-container-3d').html('<iframe src="./tour/index.html" frameborder="0"></iframe>');
                }
            });

        },
        onLeave: function() {


        },
        onLeaveCompleted: function() {


        }
    });





    var about = Barba.BaseView.extend({
        namespace: 'about',

        onEnter: function() {


        },
        onEnterCompleted: function() {


        },
        onLeave: function() {


        },
        onLeaveCompleted: function() {


        }
    });



    var contacts = Barba.BaseView.extend({
        namespace: 'contacts',

        onEnter: function() {



        },
        onEnterCompleted: function() {

            $('head').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZEMWmP3G1NHuo9dpC8lmnvqHPmVSVxrE&callback=initMap" async="" defer="" id="wewe"></script>');


        },
        onLeave: function() {


        },
        onLeaveCompleted: function() {


        }
    });



    var cost = Barba.BaseView.extend({
        namespace: 'cost',

        onEnter: function() {


        },
        onEnterCompleted: function() {


        },
        onLeave: function() {


        },
        onLeaveCompleted: function() {


        }
    });


    Barba.Dispatcher.on('initStateChange', function(currentStatus, oldStatus, container) {

        $('.menu-burger').removeClass("menu-burger_on");
        $('.menupanel').removeClass("open");
        $('body,html').animate({scrollTop: 0}, 400);

        $('.menu-logo').css('pointer-events', 'visible');
        $('.menu__proj').addClass('hiddenonpage');

        $('script[src^="https://maps.googleapis.com"]').remove();

    });
    Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {

        var height = $('.bottom-containers').height(),
            marginCont = $('.containers-wrap');
        marginCont.css('margin-bottom', height);

    });


    contacts.init();
    cost.init();
    about.init();
    projects.init();
    project.init();
    index.init();


    Barba.Pjax.start();
    Barba.Pjax.cacheEnabled = false;


});
