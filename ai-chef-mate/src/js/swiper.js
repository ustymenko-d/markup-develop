import Swiper from 'swiper'
import { Autoplay, Keyboard } from 'swiper/modules'
import 'swiper/css'

new Swiper('#testimonials-swiper', {
	modules: [Autoplay, Keyboard],
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
		1024: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1280: {
			slidesPerView: 4,
		},
	},
})
