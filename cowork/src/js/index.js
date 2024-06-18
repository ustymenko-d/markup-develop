// Webp check
function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	testWebP(function (support) {
		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

isWebp();

// Header nav
const header = document.querySelector('.header');
const menuButton = document.querySelector('.navigation__toggler');
const menuBody = document.querySelector('.navigation__wrapper');
const lockPaddingValue =
	window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
const lockPadding = document.querySelectorAll('.lock-padding');
let menuIsOpen = false;
const media = window.matchMedia('(width < 768px)');

function setupMenu(e) {
	if (e.matches) {
		menuBody.setAttribute('aria-hidden', 'true');
		menuButton.setAttribute('aria-hidden', 'false');
	} else {
		menuBody.setAttribute('aria-hidden', 'false');
		menuButton.setAttribute('aria-hidden', 'true');
	}
}

setupMenu(media);
media.addEventListener('change', (e) => {
	setupMenu(e);
});

document.querySelector('.header').addEventListener('keydown', (e) => {
	if (menuIsOpen && e.code === 'Escape') closeMenu();
});

if (menuButton) {
	menuButton.addEventListener('click', () => {
		document.documentElement.classList.contains('_lock')
			? closeMenu()
			: openMenu();
	});
}

window.addEventListener('resize', (e) => {
	if (e.currentTarget.innerWidth >= 768 && menuIsOpen) closeMenu();
});

function openMenu() {
	if (header.classList.contains('hide')) header.classList.remove('hide');

	document.documentElement.classList.add('_lock');
	header.classList.add('header_open');
	menuButton.classList.add('navigation__toggler_active');
	menuButton.setAttribute('aria-expanded', true);
	menuBody.setAttribute('aria-hidden', false);
	menuBody.classList.add('navigation__wrapper_active');
	menuBody.classList.toggle('visible');

	if (lockPadding.length > 0) {
		lockPadding.forEach((el) => (el.style.paddingRight = lockPaddingValue));
	}
	document.body.style.paddingRight = lockPaddingValue;

	menuIsOpen = true;
}

function closeMenu() {
	document.documentElement.classList.remove('_lock');
	header.classList.remove('header_open');
	menuButton.setAttribute('aria-expanded', false);
	menuButton.classList.remove('navigation__toggler_active');
	menuBody.setAttribute('aria-hidden', true);
	menuBody.classList.remove('navigation__wrapper_active');
	setTimeout(() => menuBody.classList.toggle('visible'), 400);

	if (lockPadding.length > 0) {
		lockPadding.forEach((el) => (el.style.paddingRight = 0));
	}
	document.body.style.paddingRight = 0;

	menuIsOpen = false;
}
// Header nav - end

// focus-lock
function focusLock(target) {
	const focusableElements = target.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled])'
	);
	const firstFocusableElement = focusableElements[0];
	const lastFocusableElement = focusableElements[focusableElements.length - 1];
	const KEYCODE_TAB = 9;

	target.addEventListener('keydown', (e) => {
		if (
			document.documentElement.classList.contains('_lock') &&
			(e.key === 'Tab' || e.keyCode === KEYCODE_TAB)
		) {
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
}

focusLock(header);
