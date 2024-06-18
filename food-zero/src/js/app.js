// loader

window.addEventListener('load', () => {
	setTimeout(() => {
		document.body.classList.add("loaded");
		document.querySelector('main').classList.remove('hidden');
		if (document.querySelector('.footer')) document.querySelector('.footer').classList.remove('hidden');
		if (scrollPosition() === 0) header.classList.remove('hide');;
	}, 0)
})

// header

let lastScroll = 0;
const defaultOffset = 10;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
	if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
		header.classList.add('hide');
	} else if (scrollPosition() === 0) {
		header.classList.remove('hide');
	}

	lastScroll = scrollPosition();
})

// header menu

const popupLinks = document.querySelectorAll('.menu__open-btn');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	popupLinks.forEach(popupLink => popupLink.addEventListener('click', function (e) {
		const popupName = popupLink.dataset.href.replace('#', '');
		const curentPopup = document.querySelector(`#${popupName}`);
		popupOpen(curentPopup);
		e.preventDefault();
	}));
}

const popupCloseIcon = document.querySelectorAll('.menu__close-btn');
if (popupCloseIcon.length > 0) {
	popupCloseIcon.forEach(el => el.addEventListener('click', function (e) {
		popupClose(el.closest('.menu__screen'));
		e.preventDefault();
	}))
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.menu__screen.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.menu__content')) {
				popupClose(e.target.closest('.menu__screen'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		lockPadding.forEach(el => el.style.paddingRight = lockPaddingValue);
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			lockPadding.forEach(el => el.style.paddingRight = '0px');
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		const popupActive = document.querySelector('.menu__screen.open');
		popupClose(popupActive);
	}
});

// arrow to top

window.addEventListener('scroll', () => {
	let arrowToTop = document.querySelector('.arrow-to-top');
	arrowToTop.addEventListener('click', () => {
		window.scrollTo(0, 0);
		arrowToTop.classList.add('hidden');
	})
	if (this.scrollY > document.documentElement.clientHeight) {
		arrowToTop.classList.remove('hidden');
	} else {
		arrowToTop.classList.add('hidden');
	}
})

// Slider

let swiper = document.querySelector('.swiper');

if (swiper) {
	new Swiper(swiper, {
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			768: {
				allowTouchMove: false,
			}
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction'
		},
		speed: 700,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
	})
}

// timer

document.addEventListener('DOMContentLoaded', () => {
	const page = document.querySelector('.coming-soon');

	if (page) {
		const someEvent = new Date('Jan 1 2025 00:00:00');

		const daysVal = document.querySelector('.timer__days .timer__value');
		const hoursVal = document.querySelector('.timer__hours .timer__value');
		const minutesVal = document.querySelector('.timer__minutes .timer__value');
		const secondsVal = document.querySelector('.timer__seconds .timer__value');

		const timeCount = () => {
			let now = new Date();
			let leftUntil = someEvent - now;

			let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
			let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
			let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
			let seconds = Math.floor(leftUntil / 1000) % 60;

			daysVal.textContent = days;
			hoursVal.textContent = hours;
			minutesVal.textContent = minutes;
			secondsVal.textContent = seconds;

		};

		timeCount();
		setInterval(timeCount, 1000);
	}
});

// Menu focus

let menuContent = document.querySelector('.menu__content')
let focusableElements = menuContent.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
let firstFocusableElement = focusableElements[0];
let lastFocusableElement = focusableElements[focusableElements.length - 1];

const KEYCODE_TAB = 9;

menuContent.addEventListener('keydown', (e) => {
	if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
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
