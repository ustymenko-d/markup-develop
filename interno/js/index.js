let menuBtn = document.querySelector(".menu-btn"),
	menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("active");
	menu.classList.toggle("active");
});

// button to-top

let toTop = document.querySelector('.to-top');

let checkHide = (arg) => {
	((arg.currentTarget.scrollY > document.documentElement.clientHeight)) ? toTop.classList.remove('hidden') : toTop.classList.add('hidden');
}

window.addEventListener('load', (e) => {
	checkHide(e);
})

window.addEventListener('scroll', (e) => {
	toTop.addEventListener('click', () => {
		window.scrollTo(0, 0);
		toTop.classList.add('hidden');
	});

	checkHide(e);
})