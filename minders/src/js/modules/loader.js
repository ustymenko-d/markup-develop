const loader = document.querySelector('#loader')

window.addEventListener('load', () => {
	setTimeout(() => {
		document.documentElement.classList.toggle('overflow-hidden', false)
		document.body.classList.toggle('overflow-hidden', false)
		document.body.dataset.loaded = true

		loader.classList.add('opacity-0')

		loader.addEventListener(
			'transitionend',
			() => {
				loader.remove()
			},
			{ once: true }
		)
	}, 1400)
})
