import Lenis from 'lenis'

let lenis

const lenisInit = () => {
	lenis = new Lenis()

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
}

lenisInit()

export const handlePauseScroll = () => {
	lenis.destroy()
}

export const handleResumeScroll = () => {
	lenisInit()
}
