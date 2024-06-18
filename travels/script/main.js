// Accordion

document.querySelectorAll('.accordion-item__trigger').forEach(item =>
	item.addEventListener('click', () => {
		const parent = item.parentNode;

		if (parent.classList.contains('accordion-item_active')) {
			parent.classList.remove('accordion-item_active');
		} else {
			document
				.querySelectorAll('.accordion-item')
				.forEach(child => child.classList.remove('accordion-item_active'))
			parent.classList.add('accordion-item_active')
		}
	})
)

// // Slider

new Swiper('.swiper', {
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		1024: {
			allowTouchMove: false,
			slidesPerView: 3,
			spaceBetween: 20
		}
	},
	loop: true,
	spaceBetween: 20,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

// Burger

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.header__navigation');

if (iconMenu) {
	iconMenu.addEventListener('click', openCloseMenu)
}

window.addEventListener('resize', (e) => {
	if (e.currentTarget.innerWidth >= 701 && document.documentElement.classList.contains('_lock')) openCloseMenu();
})

function openCloseMenu() {
	document.documentElement.classList.toggle('_lock');
	document.body.classList.toggle('_lock');
	iconMenu.classList.toggle('_active');
	menuBody.classList.toggle('_active');
}

// Animation

function onEntry(entry) {
	entry.forEach(change => {
		if (change.isIntersecting) {
			change.target.classList.add('_element-show');
		}
	});
}

let options = {
	threshold: [0.2]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elem of elements) {
	observer.observe(elem);
}

// Menu focus

let header = document.querySelector('.header')
let focusableElements = header.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
let firstFocusableElement = focusableElements[0];
let lastFocusableElement = focusableElements[focusableElements.length - 1];

const KEYCODE_TAB = 9;

header.addEventListener('keydown', (e) => {
	if (document.body.classList.contains('_lock') && (e.key === 'Tab' || e.keyCode === KEYCODE_TAB)) {
		if (e.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}
	}
});
