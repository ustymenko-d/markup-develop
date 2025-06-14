const offsetSize = () => {
	document.querySelector('#offset').style.paddingBottom = `${
		document.querySelector('#footer').clientHeight
	}px`
}

window.addEventListener('load', offsetSize)
window.addEventListener('resize', offsetSize)
