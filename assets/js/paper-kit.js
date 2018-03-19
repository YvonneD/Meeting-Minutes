/*!

 =========================================================
 * Paper Kit 2 - v2.1.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-kit-2
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/timcreative/paper-kit/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){
    window_width = $(window).width();

    //  Activate the tooltips
    $('[data-toggle="tooltip"]').tooltip();

    if($(".tagsinput").length != 0){
        $(".tagsinput").tagsInput();
    }
    if (window_width >= 768) {
        big_image = $('.page-header[data-parallax="true"]');

        if(big_image.length != 0){
           $(window).on('scroll', pk.checkScrollForPresentationPage);
        }
    }

    if($("#datetimepicker").length != 0){
        $('#datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            },
            debug: true
        });
    };

    // Activate bootstrap switch
    $('[data-toggle="switch"]').bootstrapSwitch();

    // Navbar color change on scroll
    if($('.navbar[color-on-scroll]').length != 0){
        $(window).on('scroll', pk.checkScrollForTransparentNavbar)
    }

    // Activate tooltips
    $('.btn-tooltip').tooltip();
    $('.label-tooltip').tooltip();

	// Carousel
	$('.carousel').carousel({
      interval: 4000
    });

    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Init popovers
    pk.initPopovers();

    // Init Collapse Areas
    pk.initCollapseArea();

    // Init Sliders
    pk.initSliders();

});


$(document).on('click', '.navbar-toggler', function(){
    $toggle = $(this);
    if(pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        setTimeout(function(){
            $toggle.removeClass('toggled');
            $('#bodyClick').remove();
        }, 550);
    } else {
        setTimeout(function(){
            $toggle.addClass('toggled');
        }, 580);

        div = '<div id="bodyClick"></div>';
        $(div).appendTo("body").click(function() {
            $('html').removeClass('nav-open');
            pk.misc.navbar_menu_visible = 0;
            $('#bodyClick').remove();
            setTimeout(function(){
                $toggle.removeClass('toggled');
            }, 550);
        });

        $('html').addClass('nav-open');
        pk.misc.navbar_menu_visible = 1;
    }
});

pk = {
    misc:{
        navbar_menu_visible: 0
    },

    checkScrollForPresentationPage: debounce(function(){
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform':'translate3d(0,' + oVal +'px,0)',
            '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
            '-ms-transform':'translate3d(0,' + oVal +'px,0)',
            '-o-transform':'translate3d(0,' + oVal +'px,0)'
        });
    }, 4),

    checkScrollForTransparentNavbar: debounce(function() {
        	if($(document).scrollTop() > $(".navbar").attr("color-on-scroll") ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar[color-on-scroll]').addClass('navbar-transparent');
                }
            }
    }, 17),

    initPopovers: function(){
        if($('[data-toggle="popover"]').length != 0){
            $('body').append('<div class="popover-filter"></div>');

            //    Activate Popovers
           $('[data-toggle="popover"]').popover().on('show.bs.popover', function () {
                $('.popover-filter').click(function(){
                    $(this).removeClass('in');
                    $('[data-toggle="popover"]').popover('hide');
                });
                $('.popover-filter').addClass('in');
            }).on('hide.bs.popover', function(){
                $('.popover-filter').removeClass('in');
            });

        }
    },
    initCollapseArea: function(){
        $('[data-toggle="pk-collapse"]').each(function () {
            var thisdiv = $(this).attr("data-target");
            $(thisdiv).addClass("pk-collapse");
        });

        $('[data-toggle="pk-collapse"]').hover(function(){
            var thisdiv = $(this).attr("data-target");
            if(!$(this).hasClass('state-open')){
                $(this).addClass('state-hover');
                $(thisdiv).css({
                    'height':'30px'
                });
            }

        },
        function(){
            var thisdiv = $(this).attr("data-target");
            $(this).removeClass('state-hover');

            if(!$(this).hasClass('state-open')){
                $(thisdiv).css({
                    'height':'0px'
                });
            }
        }).click(function(event){
                event.preventDefault();

                var thisdiv = $(this).attr("data-target");
                var height = $(thisdiv).children('.panel-body').height();

                if($(this).hasClass('state-open')){
                    $(thisdiv).css({
                        'height':'0px',
                    });
                    $(this).removeClass('state-open');
                } else {
                    $(thisdiv).css({
                        'height':height + 30,
                    });
                    $(this).addClass('state-open');
                }
            });
    },
    initSliders: function(){
        // Sliders for demo purpose in refine cards section
        if($('#sliderRegular').length != 0 ){
            var rangeSlider = document.getElementById('sliderRegular');
            noUiSlider.create(rangeSlider, {
            	start: [ 5000 ],
            	range: {
            		'min': [  2000 ],
            		'max': [ 10000 ]
            	}
            });
        }
        if($('#sliderDouble').length != 0){
            var slider = document.getElementById('sliderDouble');
            noUiSlider.create(slider, {
            	start: [20, 80],
            	connect: true,
            	range: {
            		'min': 0,
            		'max': 100
            	}
            });
        }
    },

}

examples = {
    initContactUsMap: function(){
        var myLatlng = new google.maps.LatLng(44.433530, 26.093928);
        var mapOptions = {
          zoom: 14,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        }
        var map = new google.maps.Map(document.getElementById("contactUsMap"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
        }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};


//watson js

document.querySelector("#record").onclick=()=>{
    let token="x3eCe4wGPgjHYW%2FhveFEGjVZ8CIHWU8uqi97MAi7%2FOOoluIRZEjF33er5ydQHkEuc1dBpO4WddPXTjEdF4RW1cYlrtG0ijnaclBQuP6RN%2BsbDOhTs0q0RfEm%2B3V0%2FofysH41ZyY5K8k3RTczW03xslTL%2BWra23craRn3vI%2B1PVWfX1PQpo%2BkFINhBEA1JOqK2IHX%2BGW7yOMVomWo5Ab6FhWsH2vDnkCBtjtIbSS1tGxnE18PLY3Xq%2FSDUotlJ7E%2FJH5uAuZrRAkceOyTvox15Ez0GzbTtCpWByZb%2BWE4%2BJZFW1eE6p4HnyWQ7xPLLjUhPUP1HLG2vmPQhDNVO5%2BK%2Fn2gLX0TQHJHTow5y%2BD7R%2BLZ8FMCI8v7MSYMQvouRVZfOkTcpfNiiYlNxcy%2BjPYuBZGKdljE6SkV4CDfGhfUDWg0CdgZ%2F3ycBLNyNoj1qaQUN%2BvUhI3Ut5mIn%2BEujihOw3pCBZCTBhPm%2FMVC0yR9nkB1WnUGGMf5nhzxVnK7zNSHGwf6L5uEGAB0%2BmShfzJvFgIgBPvIvSyxIECEqkUDySSqbsNGS5xMdwsRjTqmVZtmCTrhFkEzxQ%2BqPw1nXJGzm02dyqEj13GTHQDti%2FhwigKlsR8tkBiMnfqz7qryWgPTDkFahrKmO2do2mIn4ycELIQBx7jfxDi3RxAHxYh3H0EMYGLcj3YSosDV17rLbfudM7wU4QzK46gZYqwv5BweHaiea45ohEjH8%2FoEl5%2FZBBnqxmJa8FB0ZMV%2BFu0AbIJ8KT7tW0RyZoZjElaDRoS5b5kg7cOexLgv42wO%2F4L1x9v1iw6uQNdj3gvunFnaK3kO2rE9qG7XeTUCa7qQvF55qofRTEwaFb4eza8psZF1MNVBtWyQ8uZ7Unc23C6QFa5rtGkf7GNXO7fysQP7l8LKPZFX9D1dWYo8Raz7sJVr9bkNTQeCERKA1jSOpQ8TLW8a%2B622ZPhA5Gnv4%2Bxa6uO43gGJ4BmJxACJcJUBYwts%2Fk0%3D";
    let stream=WatsonSpeech.SpeechToText.recognizeMicrophone({
        token:token,
        outputElement:"#output"
    });
    stream.on("error",err=>{
        console.log("err");
    });
    document.querySelector("#stop").onclick=()=>{
        stream.stop();
    };
};