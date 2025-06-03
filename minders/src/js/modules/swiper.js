import Swiper from 'swiper'
import { A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'

const swiper = new Swiper('#swiper', {
	slidesPerView: 1.05,
	spaceBetween: 10,
	grabCursor: true,
	modules: [Keyboard, A11y],
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	breakpoints: {
		500: {
			slidesPerView: 1.25,
			spaceBetween: 16,
		},
		640: {
			slidesPerView: 2.05,
			spaceBetween: 16,
		},
		1024: {
			slidesPerView: 3,
		},
		1280: {
			slidesPerView: 3.3,
			spaceBetween: 18,
		},
	},
})

// Drag cursor
const teamSwiper = document.querySelector('#swiper')
const cursorTemplate = document
	.querySelector('#drag-cursor-template')
	.content.cloneNode(true)

let cursor = null

const ensureCursor = () => {
	if (!cursor) {
		teamSwiper.prepend(cursorTemplate)
		cursor = teamSwiper.querySelector('#drag-cursor')
	}
}

const toggleCursorVisibility = (isVisible) => {
	if (cursor) cursor.classList.toggle('drag-cursor_hidden', !isVisible)
}

const updateCursorPosition = (e) => {
	if (cursor) {
		cursor.style.left = `${e.clientX}px`
		cursor.style.top = `${e.clientY}px`
	}
}

const addDragCursor = (e) => {
	ensureCursor()
	toggleCursorVisibility(true)
	updateCursorPosition(e)
}

const removeDragCursor = () => {
	toggleCursorVisibility(false)
}

const handleTouchStart = () => {
	ensureCursor()
	cursor?.classList.add('drag-cursor_active')
}

const handleTouchMove = (_, e) => {
	if (cursor && !cursor.classList.contains('drag-cursor_hidden'))
		updateCursorPosition(e)
}

const handleTouchEnd = () => {
	cursor?.classList.remove('drag-cursor_active')
}

window.addEventListener('load', () => {
	teamSwiper.addEventListener('mouseenter', addDragCursor)
	teamSwiper.addEventListener('mousemove', updateCursorPosition)
	teamSwiper.addEventListener('mouseleave', removeDragCursor)

	swiper.on('touchStart', handleTouchStart)
	swiper.on('touchMove', handleTouchMove)
	swiper.on('touchEnd', handleTouchEnd)
})
