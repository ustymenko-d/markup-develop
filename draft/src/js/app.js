let footer = document.querySelector('.footer');
let offset = document.querySelector('.offset');

offsetSize();

window.addEventListener('resize', offsetSize);

function offsetSize() {
	offset.style.paddingBottom = `${footer.clientHeight}px`;
}

// Accordion

document.querySelectorAll('.accordion-item__trigger').forEach((item) =>
	item.addEventListener('click', () => {
		item.parentNode.classList.toggle('accordion-item--active')
	})
)

// Loader

function hideLoader() {
	document.querySelector('.page').style.overflowY = 'auto';
	document.querySelector('.loader-wrapper').style.display = 'none';
}

// button to-top

let toTop = document.querySelector('.to-top');

let checkHide = (arg) => {
	((arg.currentTarget.scrollY > document.documentElement.clientHeight)) ? toTop.classList.remove('hidden') : toTop.classList.add('hidden');
}

window.addEventListener('scroll', (e) => {
	toTop.addEventListener('click', () => {
		window.scrollTo(0, 0);
		toTop.classList.add('hidden');
	});

	checkHide(e);
})

// Animation

function onEntry(entry) {
	entry.forEach(change => {
		if (change.isIntersecting) {
			change.target.classList.add('_element-show');
		}
	});
}

let options = {
	threshold: 0.3,
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
	observer.observe(elm);
}

// Counter animation
function counterStart() {

	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll('[data-digits-counter]');

		if (digitsCounters) {
			digitsCounters.forEach(oneCounter => digitsCountersAnimate(oneCounter));
		}
	}

	function digitsCountersAnimate(oneCounter) {
		let startTimestamp = null;
		const duration = parseInt(oneCounter.dataset.digitsCounter) ? parseInt(oneCounter.dataset.digitsCounter) : 1000;
		const targetValue = parseInt(oneCounter.innerHTML);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			oneCounter.innerHTML = Math.floor(progress * (startPosition + targetValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	// start on scroll

	let options = {
		threshold: 0.3
	}
	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems);
				}

				observer.unobserve(targetElement);
			}
		})
	}, options);

	let sections = document.querySelectorAll('.countSection');
	if (sections.length) {
		sections.forEach(section => observer.observe(section));
	}
}

// Window listeners

window.addEventListener('load', () => {
	hideLoader();
	counterStart();
});
