const tags = document.querySelectorAll('.tags')

const copyPast = (elem, target) => {
	const duplicatedElem = elem.cloneNode(true)
	duplicatedElem.setAttribute('aria-hidden', true)
	target.append(duplicatedElem)
}

const createCopy = (target) => {
	const rows = target.querySelectorAll('.tags__row')
	rows.forEach((row) => {
		const rowContent = Array.from(row.children)

		for (let i = 0; i < 3; i++) {
			rowContent.forEach((elem) => {
				copyPast(elem, row)
			})
		}
	})
}

const addAnimation = () => {
	tags.forEach((tagsBlock) => {
		tagsBlock.setAttribute('data-animated', true)
		createCopy(tagsBlock)
	})
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
	addAnimation()
