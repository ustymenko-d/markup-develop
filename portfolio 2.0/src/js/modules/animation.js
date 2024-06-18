export const animationInit = () => {
	const options = {
		threshold: [0.5],
	};
	const observer = new IntersectionObserver(onEntry, options);
	const elements = document.querySelectorAll('.element-animation');

	if (elements) {
		for (let elm of elements) {
			observer.observe(elm);
		}
	}
};

function onEntry(entry) {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			change.target.classList.add('_element-show');
		}
	});
}
