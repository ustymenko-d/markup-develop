import { focusLock } from './focus-lock.js';

// Header nav
const header = document.querySelector('.header');
const menuButton = document.querySelector('.navigation__toggler');
const menuBody = document.querySelector('.navigation__links-list');
const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
const lockPadding = document.querySelectorAll('.lock-padding');
let menuIsOpen = false;
const media = window.matchMedia('(width < 768px)');

function setupMenu(e) {
	if (e.matches) {
		menuBody.setAttribute('inert', '');
		menuBody.setAttribute('aria-hidden', 'true');
		menuBody.style.transition = 'none';
		menuButton.removeAttribute('inert');
	} else {
		menuBody.removeAttribute('inert');
		menuBody.setAttribute('aria-hidden', 'false');
		menuButton.setAttribute('inert', '');
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
		document.documentElement.classList.contains('_scroll-lock') ? closeMenu() : openMenu();
	});
}

window.addEventListener('resize', (e) => {
	if (e.currentTarget.innerWidth >= 768 && menuIsOpen) closeMenu();
});

menuBody.addEventListener('click', (e) => {
	if (e.target.classList.contains('nav-item__link') && menuIsOpen) {
		closeMenu();
	}
});

function openMenu() {
	document.documentElement.classList.add('_scroll-lock');
	menuButton.classList.add('navigation__toggler_active');
	menuButton.setAttribute('aria-expanded', true);
	menuBody.removeAttribute('inert');
	menuBody.removeAttribute('style');
	menuBody.setAttribute('aria-hidden', false);
	menuBody.classList.add('navigation__links-list_active');
	focusLock(document.querySelector('.header'));
	if (lockPadding.length > 0) {
		lockPadding.forEach((el) => (el.style.paddingRight = lockPaddingValue));
	}
	document.body.style.paddingRight = lockPaddingValue;

	menuIsOpen = true;
}

function closeMenu() {
	document.documentElement.classList.remove('_scroll-lock');
	menuButton.setAttribute('aria-expanded', false);
	menuButton.classList.remove('navigation__toggler_active');
	menuBody.setAttribute('inert', '');
	menuBody.setAttribute('aria-hidden', true);
	setTimeout(() => {
		menuBody.style.transition = 'none';
	}, 400);
	menuBody.classList.remove('navigation__links-list_active');

	if (lockPadding.length > 0) {
		lockPadding.forEach((el) => (el.style.paddingRight = 0));
	}
	document.body.style.paddingRight = 0;

	menuIsOpen = false;
}
