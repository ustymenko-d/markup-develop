const bottom = document.querySelector('#bottomBlock')
const offset = document.querySelector('#offset')

const offsetSize = () => {
	offset.style.paddingBottom = `${bottom.clientHeight}px`
}

offsetSize()
window.addEventListener('resize', offsetSize)
