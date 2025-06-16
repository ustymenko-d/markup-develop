import Swiper from 'swiper'
import {
	A11y,
	Autoplay,
	Controller,
	EffectCards,
	EffectFade,
	Keyboard,
	Navigation,
	Pagination,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-creative'

const aboutSwiper = new Swiper('#info-swiper', {
	modules: [Navigation, Pagination, Controller, EffectFade, A11y],
	allowTouchMove: false,
	effect: 'fade',
	fadeEffect: {
		crossFade: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'custom',
		renderCustom: function (swiper, current, total) {
			const pad = (n) => n.toString().padStart(2, '0')
			return `${pad(current)}/${pad(total)}`
		},
	},
	slidesPerView: 1,
})

const imagesSlider = new Swiper('#images-swiper', {
	modules: [Controller, EffectCards],
	effect: 'cards',
	cardsEffect: {
		rotate: true,
		perSlideOffset: 20,
		perSlideRotate: 6,
		slideShadows: false,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	slidesPerView: 1,
	allowTouchMove: false,
})

aboutSwiper.controller.control = imagesSlider
imagesSlider.controller.control = aboutSwiper

new Swiper('#testimonials-swiper', {
	modules: [Autoplay, Keyboard, A11y],
	loop: true,
	grabCursor: true,
	autoplay: {
		delay: 5000,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	slidesPerView: 1,
	spaceBetween: 10,
	breakpoints: {
		640: {
			slidesPerView: 2,
		},
		1280: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1536: {
			slidesPerView: 4,
		},
	},
})
