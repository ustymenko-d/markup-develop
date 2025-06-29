const footer = document.querySelector('#footer')
const offset = document.querySelector('#offset')

const offsetSize = () => {
	offset.style.paddingBottom = `${footer.clientHeight}px`
}

window.addEventListener('load', () => {
	footer.classList.toggle('hidden', false)
	offsetSize()
})
window.addEventListener('resize', offsetSize)
