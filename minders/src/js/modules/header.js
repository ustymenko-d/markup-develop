import lenis from "./lenis.js"

// Header nav
const header = document.querySelector('#header')
const menuButton = document.querySelector('#navigation__burger')
const menuBody = document.querySelector('#navigation__links-list')
const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px'
const lockPaddingElements = document.querySelectorAll('.lock-padding')
let menuIsOpen = false
const media = window.matchMedia('(width < 768px)')

const setupMenu = (e) => {
	if (e.matches) {
		menuBody.setAttribute('aria-hidden', 'true')
		menuButton.setAttribute('aria-hidden', 'false')
	} else {
		menuBody.setAttribute('aria-hidden', 'false')
		menuButton.setAttribute('aria-hidden', 'true')
	}
}

setupMenu(media)

media.addEventListener('change', (e) => {
	setupMenu(e)
})

const updatePadding = (value) => {
	if (lockPaddingElements.length > 0) {
		lockPaddingElements.forEach((el) => (el.style.paddingRight = value))
	}
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

	if (!isOpen) {
		setTimeout(() => menuBody.classList.remove('visible'), 400)
	} else {
		menuBody.classList.toggle('visible', isOpen)
	}
}

const toggleMenu = (isOpen) => {
	toggleClasses()
	toggleMenuVisibility(isOpen)
	updatePadding(isOpen ? lockPaddingValue : 0)
	menuIsOpen = isOpen

	if (menuIsOpen) {
		lenis.stop()
	} else {
		lenis.start()
	}
}

const openMenu = () => toggleMenu(true)
const closeMenu = () => toggleMenu(false)

header.addEventListener('keydown', (e) => {
	if (menuIsOpen && e.code === 'Escape') closeMenu()
})

if (menuButton) {
	menuButton.addEventListener('click', () => {
		menuIsOpen ? closeMenu() : openMenu()
	})
}

window.addEventListener('resize', (e) => {
	if (e.currentTarget.innerWidth >= 768 && menuIsOpen) closeMenu()
})

// Focus lock
const focusableElements = header.querySelectorAll(
	'a[href]:not([disabled]), button:not([disabled])'
)

const [firstFocusableElement, lastFocusableElement] = [
	focusableElements[0],
	focusableElements[focusableElements.length - 1],
]

const KEYCODE_TAB = 9

header.addEventListener('keydown', (e) => {
	if (
		document.documentElement.classList.contains('overflow-hidden') &&
		(e.key === 'Tab' || e.keyCode === KEYCODE_TAB)
	) {
		const isShiftPressed = e.shiftKey
		const isAtFirstElement = document.activeElement === firstFocusableElement
		const isAtLastElement = document.activeElement === lastFocusableElement

		if (
			(isShiftPressed && isAtFirstElement) ||
			(!isShiftPressed && isAtLastElement)
		) {
			;(isShiftPressed ? lastFocusableElement : firstFocusableElement).focus()
			e.preventDefault()
		}
	}
})

// Header slide up on scroll
let lastScroll = 0
const defaultOffset = 100

const scrollPosition = () =>
	window.scrollY || document.documentElement.scrollTop
const isSlideUp = () => header.classList.contains('-translate-y-full')

window.addEventListener('scroll', () => {
	const currentScroll = scrollPosition()
	const isScrollingDown = currentScroll > lastScroll

	if (
		!menuIsOpen &&
		isScrollingDown &&
		!isSlideUp() &&
		currentScroll > defaultOffset
	) {
		header.classList.add('-translate-y-full')
		focusableElements.forEach((el) => {
			if (el === document.activeElement) el.blur()
			el.tabIndex = -1
		})
	} else if (!isScrollingDown && isSlideUp()) {
		header.classList.remove('-translate-y-full')
		focusableElements.forEach((el) => (el.tabIndex = 0))
	}

	lastScroll = currentScroll
})

// Link page scroll
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('smooth-scroll-link')) {
		e.preventDefault()

		if (menuIsOpen) closeMenu()

		const targetID = document.querySelector(`${e.target.getAttribute('href')}`)
		const scrollCoord =
			window.scrollY > targetID.offsetTop
				? targetID.offsetTop - header.clientHeight
				: targetID.offsetTop

		window.scrollTo({
			behavior: 'smooth',
			top: scrollCoord,
		})
	}
})
