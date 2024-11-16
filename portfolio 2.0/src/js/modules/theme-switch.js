const storageKey = 'theme-preference';

const getThemePreference = () => {
	if (localStorage.getItem(storageKey)) {
		return localStorage.getItem(storageKey);
	} else {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
}

const theme = {
	value: getThemePreference(),
}

const setThemeClass = () => {
	let currentThemeClass;
	let newThemeClass;

	if (document.documentElement.classList.contains('light')) {
		currentThemeClass = 'light';
		newThemeClass = 'dark';
	} else if (document.documentElement.classList.contains('dark')) {
		currentThemeClass = 'dark';
		newThemeClass = 'light';
	} else {
		newThemeClass = theme.value;
	}

	if (currentThemeClass) document.documentElement.classList.remove(`${currentThemeClass}`);
	document.documentElement.classList.add(`${newThemeClass}`);
}

const reflectPreference = () => {
	document.firstElementChild.setAttribute('data-theme', theme.value);
	document.querySelector('#theme-toggle').setAttribute('aria-label', theme.value);

	setThemeClass();
}

const setPreference = () => {
	localStorage.setItem(storageKey, theme.value);
	reflectPreference();
}

const switchTheme = () => {
	theme.value = (theme.value === 'light') ? 'dark' : 'light';

	setPreference();
}

window.addEventListener('load', () => {
	reflectPreference();

	document.querySelector('#theme-toggle').addEventListener('click', switchTheme);
})

// sync with system changes
window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', ({ matches: isDark }) => {
		theme.value = isDark ? 'dark' : 'light';
		setPreference();
	})