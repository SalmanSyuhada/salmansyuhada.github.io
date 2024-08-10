/*
Name: 			Wedding
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	6.2.1
*/

(function( $ ) {

	/*
	Slider
	*/
	$('#revolutionSlider').revolution({
		sliderType: 'standard',
		sliderLayout: 'fullwidth',
		delay: 9000,
		gridwidth: 1170,
		gridheight: 810,
		disableProgressBar: 'on',
		spinner: 'spinner3',
		parallax:{
			type:"mouse",
			origo:"slidercenter",
			speed:2000,
			levels:[2,3,4,5,6,7,12,16,10,50],
		},
		navigation: {
			arrows: {
				style: "hades",
				enable: false,
				hide_onmobile: false,
				hide_onleave: false,
				tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
				left: {
					h_align: "left",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				},
				right: {
					h_align: "right",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				}
			}
		}
	});

	/*
	Header Logo
	*/
	var $headerLogo = $('.header-logo');

	var showLogo = function() {
		$headerLogo.addClass('loaded').addClass('animated fadeInUp');
	};

	fontSpy('Great Vibes', {
		success: function() {
			showLogo();
		},
		failure: function() {
			showLogo();	
		}
	});

	/*
	Countdown
	*/
	$('#clock').countdown('2024/24/08 12:00:00').on('update.countdown', function(event) {
		var $this = $(this).html(event.strftime(''
			+ '<span>%D<span>day%!d</span></span> '
			+ '<span>%H<span>hours</span></span> '
			+ '<span>%M<span>minutes</span></span> '
			+ '<span>%S<span>seconds</span></span> '
		));
	});

	

	/*
	Popup with video or map
	*/
	$('.popup-gmaps').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});




}).apply( this, [ jQuery ]);