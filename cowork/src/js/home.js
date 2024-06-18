// Accordion
document.querySelector('.accordion').addEventListener('click', (e) => {
	if (e.target.classList.contains('accordion-item__trigger')) {
		const parentItem = e.target.closest('.accordion-item');

		if (parentItem.classList.contains('accordion-item__active')) {
			parentItem.classList.remove('accordion-item__active');
			e.target.setAttribute('aria-expanded', false);
			parentItem
				.querySelector('.accordion-item__content')
				.classList.toggle('collapsible_collapsed');
		} else {
			document.querySelectorAll('.accordion-item').forEach((item) => {
				if (item.classList.contains('accordion-item__active')) {
					item.classList.remove('accordion-item__active');
					item
						.querySelector('.accordion-item__trigger')
						.setAttribute('aria-expanded', false);
					item
						.querySelector('.accordion-item__content')
						.classList.toggle('collapsible_collapsed');
				}
			});

			parentItem.classList.add('accordion-item__active');
			e.target.setAttribute('aria-expanded', true);
			parentItem
				.querySelector('.accordion-item__content')
				.classList.toggle('collapsible_collapsed');
		}
	}
});

// Conveyor
const target = document.querySelector('.trusted__list');
let isAnimated = false;

const reduceMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
).matches;
const mediaConveyor = window.matchMedia('(min-width: 768px)').matches;

if (!reduceMotion && !mediaConveyor) {
	addAnimation();
}

function addAnimation() {
	isAnimated = true;
	createCopy(target);
}

function removeAnimation() {
	const copies = target.querySelectorAll('.trusted__item[aria-hidden="true"]');
	copies.forEach((elem) => elem.remove());

	isAnimated = false;
}

function createCopy(target) {
	const targetContent = Array.from(target.children);

	targetContent.forEach((elem) => {
		copyPast(elem, target);
	});
}

function copyPast(elem, target) {
	const duplicatedElem = elem.cloneNode(true);
	duplicatedElem.setAttribute('aria-hidden', true);
	target.append(duplicatedElem);
}

window.addEventListener('resize', () => {
	if (window.innerWidth >= 768 && isAnimated) {
		removeAnimation();
	} else if (window.innerWidth < 768 && !isAnimated) {
		addAnimation();
	}
});

// Slider
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.slider__prev-btn');
const nextButton = document.querySelector('.slider__next-btn');
const slides = Array.from(slider.querySelectorAll('.slider__slide'));
const slideCount = slides.length;
let slideIndex = 0;
let hasSlider = false;

const mediaSlider = window.matchMedia('(min-width: 1024px)').matches;

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
	slideIndex = (slideIndex - 1 + slideCount) % slideCount;
	updateSlider();
}

function showNextSlide() {
	slideIndex = (slideIndex + 1) % slideCount;
	updateSlider();
}

function updateSlider() {
	hasSlider = true;

	slides.forEach((slide, index) => {
		index === slideIndex
			? slide.classList.remove('slider__slide_hidden')
			: slide.classList.add('slider__slide_hidden');
	});
}

function removeSlider() {
	hasSlider = false;

	slides.forEach((slide) => {
		if (slide.classList.contains('slider__slide_hidden')) {
			slide.classList.remove('slider__slide_hidden');
		}
	});
}

if (!mediaSlider) updateSlider();

window.addEventListener('resize', () => {
	if (window.innerWidth >= 1024 && hasSlider) {
		removeSlider();
	} else if (window.innerWidth < 1024 && !hasSlider) {
		updateSlider();
	}
});
