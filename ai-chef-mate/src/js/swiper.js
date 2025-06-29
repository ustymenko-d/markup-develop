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

const pad = (n) => n.toString().padStart(2, '0')

const initAboutSwiper = () =>
	new Swiper('#info-swiper', {
		modules: [Navigation, Pagination, Controller, EffectFade, A11y],
		allowTouchMove: false,
		effect: 'fade',
		fadeEffect: { crossFade: true },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'custom',
			renderCustom: (_, current, total) => `${pad(current)}/${pad(total)}`,
		},
		slidesPerView: 1,
	})

const initImagesSwiper = () =>
	new Swiper('#images-swiper', {
		modules: [Controller, EffectCards],
		effect: 'cards',
		cardsEffect: {
			rotate: true,
			perSlideOffset: 20,
			perSlideRotate: 6,
			slideShadows: false,
		},
		keyboard: { enabled: true, onlyInViewport: true },
		slidesPerView: 1,
		allowTouchMove: false,
	})

const initTestimonialsSwiper = () =>
	new Swiper('#testimonials-swiper', {
		modules: [Autoplay, Keyboard, A11y],
		loop: true,
		grabCursor: true,
		autoplay: { delay: 5000 },
		keyboard: { enabled: true, onlyInViewport: true },
		slidesPerView: 1,
		spaceBetween: 10,
		breakpoints: {
			640: { slidesPerView: 2 },
			1280: { slidesPerView: 3, spaceBetween: 20 },
			1536: { slidesPerView: 4 },
		},
	})

window.addEventListener('load', () => {
	const aboutSwiper = initAboutSwiper()
	const imagesSwiper = initImagesSwiper()
	initTestimonialsSwiper()

	aboutSwiper.controller.control = imagesSwiper
	imagesSwiper.controller.control = aboutSwiper
})
