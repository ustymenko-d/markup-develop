const parallax = document.querySelector('[data-parallax]')
const layers = document.querySelectorAll('[data-parallax-layer]')

const SPEED = 0.05

let posX = 0,
		posY = 0,
		targetX = 0,
		targetY = 0

let animationId = null,
		isActive = false,
		hasInitialized = false,
		resizeTimeoutId

const getcoef = (layer) =>
	Number(layer.dataset.parallaxCoef) * (layer.dataset.parallaxInverted ? -1 : 1)

const applyLayerTransform = () => {
	layers.forEach((layer) => {
		const x = (posX / getcoef(layer)).toFixed(2)
		const y = (posY / getcoef(layer)).toFixed(2)

		layer.style.transform = `translate(${x}%, ${y}%)`
	})
}

const updateParallax = () => {
	posX += (targetX - posX) * SPEED
	posY += (targetY - posY) * SPEED

	applyLayerTransform()
	animationId = requestAnimationFrame(updateParallax)
}

const calculateTarget = ({ pageX, pageY }) => {
	const { offsetWidth: w, offsetHeight: h } = parallax
	const x = pageX - w / 2
	const y = pageY - h / 2

	targetX = (x / w) * 100
	targetY = (y / h) * 100
}

const toggleParallax = (enable) => {
	isActive = enable

	enable
		? (parallax.addEventListener('mousemove', calculateTarget),
		  updateParallax())
		: (cancelAnimationFrame(animationId),
		  parallax.removeEventListener('mousemove', calculateTarget),
		  layers.forEach((layer) => (layer.style.transform = 'translate(0, 0)')))
}

const handleResize = () => {
	clearTimeout(resizeTimeoutId)

	const shouldEnable = window.innerWidth >= 1024

	if (isActive === shouldEnable) return

	if (!hasInitialized && shouldEnable) {
		resizeTimeoutId = setTimeout(() => {
			toggleParallax(true)
			hasInitialized = true
		}, 1800)
	} else {
		toggleParallax(shouldEnable)
	}
}

const observer = new MutationObserver(() => {
	for (const layer of layers) {
		if (layer.hasAttribute('data-animated-visible')) {
			observer.disconnect()
			handleResize()
			break
		}
	}
})

Array.from(layers).some((layer) => layer.hasAttribute('data-animated-visible'))
	? handleResize()
	: layers.forEach((layer) => {
			observer.observe(layer, {
				attributes: true,
				attributeFilter: ['data-animated-visible'],
			})
	  })

window.addEventListener('resize', handleResize)
