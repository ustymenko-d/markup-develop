import Lenis from 'lenis'

let lenisInstance = null

export function initLenis() {
	if (!lenisInstance) {
		lenisInstance = new Lenis()

		function raf(time) {
			lenisInstance.raf(time)
			requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf)
	}

	return lenisInstance
}

export function getLenis() {
	if (!lenisInstance) {
		console.warn('Lenis has not been initialized yet!')
	}
	return lenisInstance
}
