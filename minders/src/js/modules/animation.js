const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach(({ isIntersecting, target }) => {
			const delay = target.dataset.delay

			const runAnimation = () => {
				if (document.body.dataset.loaded === 'true' && isIntersecting) {
					if (delay) target.style.animationDelay = `${delay}ms`

					target.setAttribute('data-animated-visible', true)

					target.addEventListener(
						'animationend',
						() => {
							target.style.animation = 'none'
						},
						{ once: true }
					)

					observer.unobserve(target)
				} else {
					requestAnimationFrame(runAnimation)
				}
			}

			runAnimation()
		})
	},
	{ threshold: 0.3 }
)

document
	.querySelectorAll('[data-animated]')
	.forEach((el) => observer.observe(el))
