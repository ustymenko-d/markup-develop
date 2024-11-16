let bottom = document.querySelector('.bottom');
let offset = document.querySelector('.offset');

offsetSize();

window.addEventListener('resize', offsetSize);

function offsetSize() {
	offset.style.paddingBottom = `${bottom.clientHeight}px`;
}
