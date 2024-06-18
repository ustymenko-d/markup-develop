import { focusLock } from './focus-lock.js';

const body = document.querySelector('body');
const openDialogButtons = document.querySelectorAll('[data-assignment=open-dialog]');
const timeoutToUnlock = 400;
let unlock = true;
let rootButton;

if (openDialogButtons.length) {
	const closeDialogButtons = document.querySelectorAll('[data-assignment=close-dialog]');

	if (closeDialogButtons.length) {
		body.addEventListener('click', (e) => {
			if (e.target.dataset.assignment === 'close-dialog') {
				modalClose(e.target.closest('[role="dialog"]'));
				e.preventDefault();
			} else if (e.target.classList.contains('close-backdrop')) {
				let parentWrap = e.target.closest('.dialogs');
				modalClose(parentWrap.querySelector('.modal_open'));
			}
		});
	}

	body.addEventListener('click', (e) => {
		const fakeLink = e.target.closest('a[data-assignment="open-dialog"]');

		if (fakeLink && fakeLink.dataset.assignment === 'open-dialog') {
			const targetID = fakeLink.dataset.target;
			const modalToOpen = document.querySelector(`${targetID}`);

			if (fakeLink.dataset.rootModal) {
				rootButton = fakeLink;
			}

			modalOpen(modalToOpen, e.target.closest('a[data-assignment="open-dialog"]'));
			e.preventDefault();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			const openModal = document.querySelector('.modal_open');

			if (openModal) modalClose(openModal);
		}
	});
}

function modalOpen(targetToOpen, test) {
	if (targetToOpen && unlock) {
		const currentOpenModal = document.querySelector('.modal_open');

		currentOpenModal ? modalClose(currentOpenModal, false) : bodyLock();

		const targetWrapper = targetToOpen.closest('.dialogs');

		if (test.classList.contains('projects__card-link') && !targetWrapper.querySelector('a[href="project.html"]')) {
			const projectLink = document.createElement('a');
			projectLink.classList.add('modal__button');
			projectLink.classList.add('button');
			projectLink.setAttribute('href', 'project.html');
			projectLink.textContent = 'Go to progect page';

			targetWrapper.querySelector('.modal__button').after(projectLink);
		}

		targetWrapper.removeAttribute('hidden');
		targetWrapper.classList.add('dialogs_open');
		targetToOpen.removeAttribute('hidden');
		targetToOpen.classList.add('modal_open');

		focusLock(targetToOpen);
	}
}

function modalClose(targetToClose, doUnlock = true) {
	if (unlock) {
		targetToClose.classList.remove('modal_open');
		targetToClose.setAttribute('hidden', '');

		targetToClose.closest('.dialogs').classList.remove('dialogs_open');
		targetToClose.closest('.dialogs').setAttribute('hidden', '');

		if (doUnlock) {
			bodyUnlock();

			rootButton.focus();
		}
	}
}

function bodyLock() {
	const lockPadding = document.querySelectorAll('.lock-padding'); // For position:fixed elements

	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

	if (lockPadding.length) {
		lockPadding.forEach((el) => {
			el.style.left = parseFloat(window.getComputedStyle(el).left) + lockPaddingValue;
		});
	}

	body.style.paddingRight = lockPaddingValue;
	body.parentElement.classList.add('_scroll-lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeoutToUnlock);
}

function bodyUnlock() {
	const lockPadding = document.querySelectorAll('.lock-padding');

	setTimeout(() => {
		if (lockPadding.length) {
			lockPadding.forEach((el) => {
				el.removeAttribute('style');
			});
		}
		body.removeAttribute('style');
		body.parentElement.classList.remove('_scroll-lock');
	}, timeoutToUnlock);

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeoutToUnlock);
}
