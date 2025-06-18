import lenis from './lenis.js'

const CLASSES = {
	visible: ['visible', 'opacity-100', 'scale-100'],
	invisible: ['invisible', 'opacity-0', 'scale-75'],
}

const toTop = document.querySelector('#to-top')

let isManuallyScrolling = false
let scrollEndTimeout = null

const updateToTopVisibility = (isVisible) => {
	toTop.classList.remove(...CLASSES[isVisible ? 'invisible' : 'visible'])
	toTop.classList.add(...CLASSES[isVisible ? 'visible' : 'invisible'])
}

const toggleToTopVisibility = () => {
	if (isManuallyScrolling) return

	const shouldShow = window.scrollY > window.innerHeight
	updateToTopVisibility(shouldShow)
}

const scrollToTop = () => {
	isManuallyScrolling = true
	lenis.scrollTo(0)
	updateToTopVisibility(false)
}

lenis.on('scroll', () => {
	toggleToTopVisibility()

	if (isManuallyScrolling) {
		clearTimeout(scrollEndTimeout)
		scrollEndTimeout = setTimeout(() => {
			isManuallyScrolling = false
			toggleToTopVisibility()
		}, 150)
	}
})

toTop.addEventListener('click', scrollToTop)
