import { initLenis } from './lenis.js'

const loader = document.querySelector('#loader')

window.addEventListener('load', () => {
	setTimeout(() => {
		loader.classList.add('opacity-0')

		loader.addEventListener(
			'transitionend',
			() => {
				document.documentElement.classList.toggle('overflow-hidden', false)
				document.body.classList.toggle('overflow-hidden', false)
				document.body.dataset.loaded = true
				loader.remove()
				initLenis()
			},
			{ once: true }
		)
	}, 1400)
})
