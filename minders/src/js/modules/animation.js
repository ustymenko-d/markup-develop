const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach(({ isIntersecting, target }) => {
			const delay = target.dataset.delay

			if (delay) target.style.animationDelay = `${delay}ms`

			if (isIntersecting) {
				target.setAttribute('data-animated-visible', true)
				target.addEventListener(
					'animationend',
					() => {
						target.style.animation = 'none'
					},
					{ once: true }
				)
				observer.unobserve(target)
			}
		})
	},
	{ threshold: 0.3 }
)

document
	.querySelectorAll('[data-animated]')
	.forEach((el) => observer.observe(el))
