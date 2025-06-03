export const header = document.querySelector('#header')
export const menuButton = document.querySelector('#navigation__burger')
export const menuBody = document.querySelector('#navigation__links-list')
export const lockPaddingElements = document.querySelectorAll('.lock-padding')
export const mediaQuery = window.matchMedia('(width < 768px)')
export const focusableElements = header.querySelectorAll(
	'a[href]:not([disabled]), button:not([disabled])'
)
