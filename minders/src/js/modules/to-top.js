import lenis from './lenis.js'

const CLASSES = {
	visible: ['visible', 'opacity-100', 'scale-100'],
	invisible: ['invisible', 'opacity-0', 'scale-75'],
}

const toTop = document.querySelector('#to-top')

const updateToTopVisibility = (isVisible) => {
	toTop.classList.remove(...CLASSES[isVisible ? 'invisible' : 'visible'])
	toTop.classList.add(...CLASSES[isVisible ? 'visible' : 'invisible'])
}

const toggleToTopVisibility = () => {
	const shouldShow = window.scrollY > document.documentElement.clientHeight
	updateToTopVisibility(shouldShow)
}

const scrollToTop = () => {
	lenis.scrollTo(0)
	updateToTopVisibility(false)
}

toTop.addEventListener('click', scrollToTop)
window.addEventListener('scroll', toggleToTopVisibility)
