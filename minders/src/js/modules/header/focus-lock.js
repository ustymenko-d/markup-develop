import { header, focusableElements } from './constants.js'

const [first, last] = [
	focusableElements[0],
	focusableElements[focusableElements.length - 1],
]

const initFocusLock = () => {
	header.addEventListener('keydown', (e) => {
		if (
			document.documentElement.classList.contains('overflow-hidden') &&
			(e.key === 'Tab' || e.keyCode === 9)
		) {
			const isShift = e.shiftKey
			const active = document.activeElement
			const isAtFirst = active === first
			const isAtLast = active === last

			if ((isShift && isAtFirst) || (!isShift && isAtLast)) {
				;(isShift ? last : first).focus()

				e.preventDefault()
			}
		}
	})
}

export default initFocusLock
