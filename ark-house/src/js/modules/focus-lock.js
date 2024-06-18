export function focusLock(target) {
	const focusableElements = target.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
	const firstFocusableElement = focusableElements[0];
	const lastFocusableElement = focusableElements[focusableElements.length - 1];
	const KEYCODE_TAB = 9;

	firstFocusableElement.focus();

	target.addEventListener('keydown', (e) => {
		if (document.documentElement.classList.contains('_scroll-lock') && (e.key === 'Tab' || e.keyCode === KEYCODE_TAB)) {
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
