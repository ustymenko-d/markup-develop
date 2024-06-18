import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const swiperInit = () => {
	const swiper = new Swiper('.swiper', {
		speed: 700,
		keyboard: true,
		simulateTouch: false,
		mousewheel: true,
		navigation: {
			nextEl: '.pointer',
		},
		direction: 'horizontal',
		effect: 'coverflow',
		coverflowEffect: {
			slideShadows: false,
			rotate: 100,
		},
		pagination: {
			el: '.progressbar',
			type: 'progressbar',
		},
		breakpoints: {
			992: {
				direction: 'vertical',
			},
		},
	});

	document.querySelectorAll('.no-mousewheel').forEach((elem) => {
		elem.addEventListener('pointerenter', () => swiper.disable());
		elem.addEventListener('pointerleave', () => swiper.enable());
	});
};
