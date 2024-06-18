const toTop = document.querySelector('.to-top');

const checkHide = (arg) => {
	arg.currentTarget.scrollY > document.documentElement.clientHeight ? toTop.classList.remove('hidden') : toTop.classList.add('hidden');
};

toTop.addEventListener('click', () => {
	window.scrollTo(0, 0);
	toTop.classList.add('hidden');
});

window.addEventListener('scroll', (e) => {
	checkHide(e);
});
