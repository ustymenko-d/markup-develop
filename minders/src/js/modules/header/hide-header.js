import { menuIsOpen } from './menu.js'
import { header } from './constants.js'

let lastScroll = 0

const scrollPosition = () =>
	window.scrollY || document.documentElement.scrollTop

const isHeaderHidden = () => header.classList.contains('-translate-y-full')

const initScrollHeader = () => {
	window.addEventListener('scroll', () => {
		const currentScroll = scrollPosition()
		const isScrollingDown = currentScroll > lastScroll

		if (
			!menuIsOpen &&
			isScrollingDown &&
			!isHeaderHidden() &&
			currentScroll > 100
		) {
			header.classList.add('-translate-y-full')
			focusableElements.forEach((el) => {
				if (el === document.activeElement) el.blur()
				el.tabIndex = -1
			})
		} else if (!isScrollingDown && isHeaderHidden()) {
			header.classList.remove('-translate-y-full')
			focusableElements.forEach((el) => (el.tabIndex = 0))
		}

		lastScroll = currentScroll
	})
}

export default initScrollHeader
