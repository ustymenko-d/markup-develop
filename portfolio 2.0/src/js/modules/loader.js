export const hideLoader = () => {
	const page = document.querySelector('.page');

	setTimeout(() => {
		page.removeAttribute('inert');
		page.classList.add('loaded');
		setTimeout(() => {
			document.querySelector('.loader').classList.add('hide');
		}, 800);
	}, 0);
};
