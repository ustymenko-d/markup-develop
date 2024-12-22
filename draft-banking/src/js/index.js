// Offset
const footer = document.querySelector('.footer')
const offset = document.querySelector('.offset')

const offsetSize = () => {
	offset.style.paddingBottom = `${footer.clientHeight}px`
}

offsetSize()

window.addEventListener('resize', offsetSize)

// Accordion
document.querySelectorAll('.accordionItem__trigger').forEach((item) =>
	item.addEventListener('click', () => {
		item.parentNode.classList.toggle('accordionItem_active')
	})
)

// to-top button
const toTop = document.querySelector('.toTop')

const checkHide = (arg) => {
	arg.currentTarget.scrollY > document.documentElement.clientHeight
		? toTop.classList.remove('toTop_hidden')
		: toTop.classList.add('toTop_hidden')
}

window.addEventListener('scroll', (e) => {
	toTop.addEventListener('click', () => {
		window.scrollTo(0, 0)
		toTop.classList.add('toTop_hidden')
	})

	checkHide(e)
})

// Animation
const onEntry = (entry) => {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			change.target.classList.add('element-show')
		}
	})
}

const options = {
	threshold: 0.3,
}
const observer = new IntersectionObserver(onEntry, options)
const elements = document.querySelectorAll('.element-animation')

for (let elm of elements) {
	observer.observe(elm)
}

const counterStart = () => {
	const digitsCountersAnimate = (oneCounter) => {
		let startTimestamp = null
		const duration = parseInt(oneCounter.dataset.digitsCounter)
			? parseInt(oneCounter.dataset.digitsCounter)
			: 1000
		const targetValue = parseInt(oneCounter.innerHTML)
		const startPosition = 0
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp
			const progress = Math.min((timestamp - startTimestamp) / duration, 1)
			oneCounter.innerHTML = Math.floor(
				progress * (startPosition + targetValue)
			)
			if (progress < 1) {
				window.requestAnimationFrame(step)
			}
		}
		window.requestAnimationFrame(step)
	}

	const digitsCountersInit = (digitsCountersItems) => {
		const digitsCounters = digitsCountersItems
			? digitsCountersItems
			: document.querySelectorAll('[data-digits-counter]')

		if (digitsCounters) {
			digitsCounters.forEach((oneCounter) => digitsCountersAnimate(oneCounter))
		}
	}

	// start on scroll
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const targetElement = entry.target
				const digitsCountersItems = targetElement.querySelectorAll(
					'[data-digits-counter]'
				)
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems)
				}

				observer.unobserve(targetElement)
			}
		})
	}, options)

	const sections = document.querySelectorAll('.countSection')
	if (sections.length) {
		sections.forEach((section) => observer.observe(section))
	}
}

// Window listeners
window.addEventListener('load', () => {
	counterStart()
})
