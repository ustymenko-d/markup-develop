const parallax = document.querySelector('[data-parallax]')
const layers = document.querySelectorAll('[data-parallax-layer]')

const SPEED = 0.05

let posX = 0,
	posY = 0,
	targetX = 0,
	targetY = 0,
	animationId = null,
	isActive = false

const applyLayerTransform = () => {
	layers.forEach((layer) => {
		const coef =
			Number(layer.dataset.parallaxCoef) *
			(layer.dataset.parallaxInverted ? -1 : 1)

		const x = (posX / coef).toFixed(2)
		const y = (posY / coef).toFixed(2)

		layer.style.transform = `translate(${x}%, ${y}%)`
	})
}

const updateParallax = () => {
	const deltaX = targetX - posX
	const deltaY = targetY - posY

	posX += deltaX * SPEED
	posY += deltaY * SPEED

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

const enableParallax = () => {
	if (isActive) return

	isActive = true

	parallax.addEventListener('mousemove', calculateTarget)
	updateParallax()
}

const disableParallax = () => {
	if (!isActive) return

	isActive = false

	cancelAnimationFrame(animationId)
	parallax.removeEventListener('mousemove', calculateTarget)
	layers.forEach((layer) => (layer.style.transform = ''))
}

const handleResize = () => {
	window.innerWidth >= 1024 ? enableParallax() : disableParallax()
}

if (parallax && layers.length) {
	handleResize()
	window.addEventListener('resize', handleResize)
}
