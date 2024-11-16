// Slider
let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.slider__wrapper');

const end = () => {
	isDown = false;
	slider.classList.remove('slider__wrapper_active');
};

const start = (e) => {
	isDown = true;
	slider.classList.add('slider__wrapper_active');
	startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
};

const move = (e) => {
	if (!isDown) return;

	if (e.type === 'mousemove') e.preventDefault();

	const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
	const dist = x - startX;
	slider.scrollLeft = scrollLeft - dist;
};

// Slider cursor
const addDragCursor = (e) => {
	const cursor = slider.parentElement.querySelector('.drag-cursor');

	if (cursor) {
		cursor.classList.remove('drag-cursor_hidden');
	} else {
		const cursorTemplate = slider.previousElementSibling.content;
		slider.parentElement.prepend(cursorTemplate);

		let newCursor = slider.parentElement.querySelector('.drag-cursor');
		newCursor.style.left = e.clientX + 'px';
		newCursor.style.top = e.clientY + 'px';
	}
};

const moveDragCursor = (e) => {
	const cursor = document.querySelector('.drag-cursor');
	let x = e.clientX;
	let y = e.clientY;

	if (cursor) {
		cursor.style.left = x + 'px';
		cursor.style.top = y + 'px';
	}
};

const removeDragCursor = () => {
	const cursor = slider.parentElement.querySelector('.drag-cursor');

	if (cursor) {
		cursor.classList.add('drag-cursor_hidden');
	}
};

// Listeners
window.addEventListener('load', () => {
	slider.addEventListener('mousedown', start);
	slider.addEventListener('touchstart', start);

	slider.addEventListener('mousemove', move);
	slider.addEventListener('touchmove', move);

	slider.addEventListener('mouseleave', end);
	slider.addEventListener('mouseup', end);
	slider.addEventListener('touchend', end);

	slider.addEventListener('mouseenter', addDragCursor);
	slider.addEventListener('mousemove', moveDragCursor);
	slider.addEventListener('mouseleave', removeDragCursor);

	slider.addEventListener('mousedown', () => {
		const cursor = slider.parentElement.querySelector('.drag-cursor');
		if (cursor) {
			cursor.classList.add('drag-cursor_active');
		}
	});
	slider.addEventListener('mouseup', () => {
		const cursor = slider.parentElement.querySelector('.drag-cursor');
		if (cursor) {
			cursor.classList.remove('drag-cursor_active');
		}
	});
});
