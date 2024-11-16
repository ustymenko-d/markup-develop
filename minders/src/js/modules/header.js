// Header nav
const header = document.querySelector('.header');
const menuButton = document.querySelector('.navigation__burger');
const menuBody = document.querySelector('.navigation__links-list');
const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
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
		document.documentElement.classList.contains('_lock') ? closeMenu() : openMenu();
	});
}

window.addEventListener('resize', (e) => {
	if (e.currentTarget.innerWidth >= 768 && menuIsOpen) closeMenu();
});

function openMenu() {
	if (header.classList.contains('hide')) header.classList.remove('hide');

	document.documentElement.classList.add('_lock');
	menuButton.classList.add('navigation__burger_active');
	menuButton.setAttribute('aria-expanded', true);
	menuBody.setAttribute('aria-hidden', false);
	menuBody.classList.add('navigation__links-list_active');
	menuBody.classList.toggle('visible');

	if (lockPadding.length > 0) {
		lockPadding.forEach((el) => (el.style.paddingRight = lockPaddingValue));
	}
	document.body.style.paddingRight = lockPaddingValue;

	menuIsOpen = true;
}

function closeMenu() {
	document.documentElement.classList.remove('_lock');
	menuButton.setAttribute('aria-expanded', false);
	menuButton.classList.remove('navigation__burger_active');
	menuBody.setAttribute('aria-hidden', true);
	menuBody.classList.remove('navigation__links-list_active');
	setTimeout(() => menuBody.classList.toggle('visible'), 400);

	if (lockPadding.length > 0) {
		lockPadding.forEach((el) => (el.style.paddingRight = 0));
	}
	document.body.style.paddingRight = 0;

	menuIsOpen = false;
}

// Header nav focus lock
const focusableElements = header.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

const KEYCODE_TAB = 9;

header.addEventListener('keydown', (e) => {
	if (document.documentElement.classList.contains('_lock') && (e.key === 'Tab' || e.keyCode === KEYCODE_TAB)) {
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

// Header slide up on scroll
let lastScroll = 0;
const defaultOffset = 100;

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containSlideUp = () => header.classList.contains('slide-up');

window.addEventListener('scroll', () => {
	if (scrollPosition() > lastScroll && !containSlideUp() && scrollPosition() > defaultOffset) {
		header.classList.add('slide-up');
		focusableElements.forEach((el) => {
			if (el === document.activeElement) el.blur();
			el.tabIndex = -1;
		});
	} else if (scrollPosition() < lastScroll && containSlideUp()) {
		header.classList.remove('slide-up');
		focusableElements.forEach((el) => (el.tabIndex = 0));
	}

	lastScroll = scrollPosition();
});

// Link page scroll
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('smooth-scroll-link')) {
		e.preventDefault();

		if (menuIsOpen) closeMenu();

		const targetID = document.querySelector(`${e.target.getAttribute('href')}`);
		const scrollCoord = window.pageYOffset > targetID.offsetTop ? targetID.offsetTop - header.clientHeight : targetID.offsetTop;

		window.scrollTo({
			behavior: 'smooth',
			top: scrollCoord,
		});
	}
});
