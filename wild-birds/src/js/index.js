import Swiper from 'swiper'
import { Pagination, A11y, Keyboard } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

new Swiper('.swiper', {
	modules: [Keyboard, A11y, Pagination],
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
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
