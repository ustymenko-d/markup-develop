const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	popupLinks.forEach(popupLink => popupLink.addEventListener('click', function (e) {
		const popupName = popupLink.getAttribute('href').replace('#', '');
		const curentPopup = document.querySelector(`#${popupName}`);
		popupOpen(curentPopup);
		e.preventDefault();
	}));
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	popupCloseIcon.forEach(el => el.addEventListener('click', function (e) {
		popupClose(el.closest('.popup'));
		e.preventDefault();
	}))
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');

		focusLock(curentPopup);

		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
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
	const lockPaddingValue = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';

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
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

function focusLock(target) {
	const popupFocusableElem = target.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
	const popupFirstFocusableElem = popupFocusableElem[0];
	const popupLastFocusableElem = popupFocusableElem[popupFocusableElem.length - 1];

	target.addEventListener('keydown', (e) => {
		if (document.body.classList.contains('lock') && (e.key === 'Tab' || e.keyCode === 9)) {
			if (e.shiftKey) {
				if (document.activeElement === popupFirstFocusableElem) {
					popupLastFocusableElem.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === popupLastFocusableElem) {
					popupFirstFocusableElem.focus();
					e.preventDefault();
				}
			}
		}
	});
}
