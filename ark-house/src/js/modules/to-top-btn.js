const addToTop = () => {
	const toTop = document.createElement('button');
	toTop.classList.add('to-top');
	toTop.classList.add('lock-padding');
	toTop.tabIndex = 0;
	toTop.addEventListener('click', () => {
		window.scrollTo(0, 0);
		toTop.classList.add('hidden');
	});

	document.body.append(toTop);
};

const checkHide = (arg) => {
	const toTop = document.querySelector('.to-top');
	const media = arg.currentTarget.scrollY > document.documentElement.clientHeight;

	if (media && !toTop) {
		addToTop();
	}

	if (!media && toTop) {
		toTop.classList.add('hidden');
	}

	if (media && toTop) toTop.classList.remove('hidden');
};

window.addEventListener('scroll', (e) => {
	checkHide(e);
});
