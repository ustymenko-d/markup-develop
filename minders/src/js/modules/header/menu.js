import lenis from '../lenis.js'
import {
	header,
	menuButton,
	menuBody,
	lockPaddingElements,
	mediaQuery,
} from './constants.js'

const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px'

let menuIsOpen = false

const updatePadding = (value) => {
	lockPaddingElements.forEach((el) => (el.style.paddingRight = value))
	document.body.style.paddingRight = value
}

const toggleClasses = () => {
	document.documentElement.classList.toggle('overflow-hidden')
	menuButton.classList.toggle('navigation__burger_active')
}

const setAriaAttributes = (isOpen) => {
	menuButton.setAttribute('aria-expanded', isOpen)
	menuBody.setAttribute('aria-hidden', !isOpen)
}

const toggleMenuVisibility = (isOpen) => {
	setAriaAttributes(isOpen)

	menuBody.classList.toggle('navigation__links-list_active', isOpen)

	if (isOpen) {
		menuBody.classList.add('visible')
	} else {
		setTimeout(() => menuBody.classList.remove('visible'), 400)
	}
}

const toggleMenu = (isOpen) => {
	toggleClasses()
	toggleMenuVisibility(isOpen)
	updatePadding(isOpen ? lockPaddingValue : '0px')
	menuIsOpen = isOpen
	isOpen ? lenis.stop() : lenis.start()
}

const openMenu = () => toggleMenu(true)
const closeMenu = () => toggleMenu(false)

const setupMenu = (media) => {
	menuBody.setAttribute('aria-hidden', media.matches ? 'true' : 'false')
	menuButton.setAttribute('aria-hidden', media.matches ? 'false' : 'true')
}

const initMenu = () => {
	setupMenu(mediaQuery)
	mediaQuery.addEventListener('change', setupMenu)

	menuButton?.addEventListener('click', () => {
		menuIsOpen ? closeMenu() : openMenu()
	})

	window.addEventListener('resize', (e) => {
		if (e.currentTarget.innerWidth >= 768 && menuIsOpen) closeMenu()
	})

	header.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && menuIsOpen) closeMenu()
	})
}

export { closeMenu, menuIsOpen }
export default initMenu
