const bottom = document.querySelector('#bottomBlock')
const offset = document.querySelector('#offset')

const offsetSize = () => {
	document.querySelector('#offset').style.paddingBottom = `${
		document.querySelector('#bottomBlock').clientHeight
	}px`
}

window.addEventListener('load', offsetSize)
window.addEventListener('resize', offsetSize)
