import Swiper from 'swiper'
import {
	Pagination,
	A11y,
	Keyboard,
	//  Navigation,
} from 'swiper/modules'

import 'swiper/css'
// import 'swiper/css/navigation'
import 'swiper/css/pagination'

new Swiper('.swiper', {
	modules: [
		Keyboard,
		A11y,
		Pagination,
		// Navigation,
	],
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	loop: true,
	grabCursor: true,
})

window.addEventListener('load', () => {
	setTimeout(() => {
		document.body.classList.add('page_loaded')
	}, 500)
})
