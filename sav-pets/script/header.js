const headerWrapper = document.querySelector('.header-wrapper');
const headerImage = document.querySelector('.header__logo-image');
let menuButton = document.querySelector('.menu-btn');

// Color
let lastScroll = 0;
const defaultOffset = 100;

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containColored = () => headerWrapper.classList.contains('bg_colored');

window.addEventListener('scroll', () => {
	if (scrollPosition() > lastScroll && !containColored() && scrollPosition() > defaultOffset) {
		headerWrapper.classList.add('bg_colored');
		headerImage.src = 'images/icon/white-logo.svg';
	} else if (scrollPosition() === 0 && containColored()) {
		headerWrapper.classList.remove('bg_colored');
		headerImage.src = 'images/icon/blue-logo.svg';
	}

	lastScroll = scrollPosition();
});

menuButton.addEventListener('mousedown', () => {
	headerWrapper.classList.add('bg_colored');
	headerImage.src = 'images/icon/white-logo.svg';
});

menuButton.addEventListener('keypress', (e) => {
	if (e.keyCode == 13 || e.keyCode == 32) {
		headerWrapper.classList.add('bg_colored');
		headerImage.src = 'images/icon/white-logo.svg';
	}
});

// Nav

function openCloseMenu() {
	document.body.classList.toggle('lock');
	menuButton.classList.toggle('active');
	menu.classList.toggle('active');
}

let menu = document.querySelector('.menu');
menuButton.addEventListener('click', openCloseMenu)

window.addEventListener('resize', (e) => {
	if (e.currentTarget.innerWidth > 800 && document.body.classList.contains('lock')) {
		openCloseMenu();
	}
})

// Menu focus

const header = document.querySelector('.header');
const focusableElements = header.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

const KEYCODE_TAB = 9;

header.addEventListener('keydown', (e) => {
	if (document.body.classList.contains('lock') && (e.key === 'Tab' || e.keyCode === KEYCODE_TAB)) {
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
