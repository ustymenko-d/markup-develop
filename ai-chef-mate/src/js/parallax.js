const parallax = document.querySelector('[data-parallax]')
const layers = [...document.querySelectorAll('[data-parallax-layer]')]

const SPEED = 0.05
const THRESHOLD = 0.01

let posX = 0
let posY = 0

let targetX = 0
let targetY = 0

let animationId = null
let isActive = false
let hasInitialized = false
let resizeTimeoutId

let containerWidth = parallax.offsetWidth
let containerHeight = parallax.offsetHeight

const layerCoefs = new Map()

layers.forEach(layer => {
	const coef =
		Number(layer.dataset.parallaxCoef) * (layer.hasAttribute('data-parallax-inverted') ? -1 : 1)

	layerCoefs.set(layer, coef)
})

const getLayerCoef = layer => layerCoefs.get(layer)

const applyLayerTransform = () => {
	layers.forEach(layer => {
		const x = posX / getLayerCoef(layer)
		const y = posY / getLayerCoef(layer)
		layer.style.transform = `translate(${x}%, ${y}%)`
	})
}

const updateParallax = () => {
	const dx = targetX - posX
	const dy = targetY - posY

	if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) {
		animationId = null
		return
	}

	posX += dx * SPEED
	posY += dy * SPEED
	applyLayerTransform()

	animationId = requestAnimationFrame(updateParallax)
}

const calculateTarget = ({ pageX, pageY }) => {
	targetX = ((pageX - containerWidth / 2) / containerWidth) * 100
	targetY = ((pageY - containerHeight / 2) / containerHeight) * 100

	if (!animationId) updateParallax()
}

const toggleParallax = enable => {
	if (enable === isActive) return

	isActive = enable

	if (enable) {
		parallax.addEventListener('mousemove', calculateTarget, { passive: true })
	} else {
		parallax.removeEventListener('mousemove', calculateTarget)
		if (animationId) cancelAnimationFrame(animationId)
		animationId = null
		layers.forEach(layer => {
			layer.style.transform = 'translate(0, 0)'
		})
	}
}

const handleResize = () => {
	clearTimeout(resizeTimeoutId)

	containerWidth = parallax.offsetWidth
	containerHeight = parallax.offsetHeight

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

layers.some(layer => layer.hasAttribute('data-animated-visible'))
	? handleResize()
	: layers.forEach(layer => {
			observer.observe(layer, {
				attributes: true,
				attributeFilter: ['data-animated-visible'],
			})
	  })

window.addEventListener('resize', handleResize)
