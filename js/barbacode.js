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

            $('.menu__proj').removeClass('hiddenonpage');
            $('.menu-logo').css('pointer-events', 'none');

        },
        onEnterCompleted: function() {

            setTimeout(function () {
                initMap();
            }, 500);



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
                    // console.log(erer);
                    // console.log(rtrt);
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


            // special-script --- end


        },
        onLeave: function() {


        },
        onLeaveCompleted: function() {


        }
    });


    var projects = Barba.BaseView.extend({
        namespace: 'projects',

        onEnter: function() {


        },
        onEnterCompleted: function() {


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

            $('.fancy').fancybox({
                padding:0,
                openEffect: 'fadeIn'
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

            setTimeout(function () {
                initMap();
            }, 500);

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
