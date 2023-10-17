const handleSliderTabsProduct = function () {
	if ($('.slider-tabs').length) {
		$('.slider-tabs').each(function () {
			const sliderItem = '#' + $(this).attr('id');

			new Swiper(sliderItem + ' .swiper', {
				speed: 1000,
				slidesPerView: 4,
				preloadImages: false,
				spaceBetween: 16,
				breakpoints: {
					320: {
						slidesPerView: 1.25,
						spaceBetween: 10,
					}, 768: {
						slidesPerView: 2.25,
						spaceBetween: 10,
					}, 991: {
						slidesPerView: 3.25,
						spaceBetween: 10,
					}, 1200: {
						slidesPerView: 4,
					}
				},
				navigation: {
					nextEl: sliderItem + " .slider-button_next",
					prevEl: sliderItem + " .slider-button_prev",
				},
			});
		});
	}
}

$(function () {
	handleSliderTabsProduct();
});
