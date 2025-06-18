const parallax = document.querySelector('[data-parallax]')
const layer = document.querySelector('[data-parallax-layer]')

const SPEED = 0.05

let posX = 0,
		posY = 0,
		targetX = 0,
		targetY = 0

let animationId = null,
		resizeTimeoutId,
		isActive = false,
		hasInitialized = false

const getCoef = (axis) =>
	Number(layer.dataset.parallaxCoef) * (axis === 'x' ? -1 : 1)

const applyLayerTransform = () => {
	const x = (posX / getCoef('x')).toFixed(2)
	const y = Math.max(posY / getCoef('y'), 0).toFixed(2)

	layer.style.transform = `translate(${x}%, ${y}%)`
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

	layer.classList.toggle('absolute', enable)

	enable
		? (parallax.addEventListener('mousemove', calculateTarget),
		  updateParallax())
		: (cancelAnimationFrame(animationId),
		  parallax.removeEventListener('mousemove', calculateTarget),
		  (layer.style.transform = 'translate(0, 0)'))
}

const handleResize = () => {
	clearTimeout(resizeTimeoutId)

	const shouldEnable =
		window.innerWidth >= 768 && layer.hasAttribute('data-animated-visible')

	if (shouldEnable === isActive) return

	if (!hasInitialized && shouldEnable) {
		hasInitialized = true
		resizeTimeoutId = setTimeout(() => toggleParallax(true), 1000)
	} else {
		toggleParallax(shouldEnable)
	}
}

const observer = new MutationObserver(() => {
	if (layer.hasAttribute('data-animated-visible')) {
		observer.disconnect()
		handleResize()
	}
})

layer.hasAttribute('data-animated-visible')
	? handleResize()
	: observer.observe(layer, {
			attributes: true,
			attributeFilter: ['data-animated-visible'],
	  })

window.addEventListener('resize', handleResize)
