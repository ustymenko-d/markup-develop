function onEntry(entry) {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			change.target.classList.add('_element-show');
		}
	});
}

let options = {
	threshold: 0.3,
};
let observer = new IntersectionObserver(onEntry, options);
let animatedElements = document.querySelectorAll('.element-animation');

if (animatedElements) {
	for (let elem of animatedElements) {
		observer.observe(elem);
	}
}
