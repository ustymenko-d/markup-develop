const toTop = document.querySelector('#to-top')

const toggleToTopVisibility = () => {
	const shouldShow = window.scrollY > document.documentElement.clientHeight
	toTop.classList.toggle('to-top_visible', shouldShow)
}

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
	toTop.classList.remove('to-top_visible')
}

toTop.addEventListener('click', scrollToTop)
window.addEventListener('scroll', toggleToTopVisibility)
