import { closeMenu, menuIsOpen } from './menu.js'
import { header } from './constants.js'

const initSmoothScroll = () => {
	document.addEventListener('click', (e) => {
		const link = e.target.closest('.smooth-scroll-link')
		if (!link) return

		e.preventDefault()
		if (menuIsOpen) closeMenu()

		const target = document.querySelector(link.getAttribute('href'))
		if (!target) return

		const scrollTo =
			window.scrollY > target.offsetTop
				? target.offsetTop - header.clientHeight
				: target.offsetTop

		window.scrollTo({
			top: scrollTo,
			behavior: 'smooth',
		})
	})
}

export default initSmoothScroll
