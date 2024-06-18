import Swiper from 'swiper';
import 'swiper/css';

let swiperGallery;
let swiperReviews;

let copyGallery = document.querySelector('.benefits__gallery').cloneNode(true);
let copyReviews = document.querySelector('.reviews').cloneNode(true);

window.addEventListener('load', (e) => {
	checkHide(e);
	pageLoaded();

	if (!window.matchMedia("(min-width: 768px)").matches) {
		swiperGallery = initSwipers('.benefits__gallery');
	}
	if (!window.matchMedia("(min-width: 992px)").matches) {
		swiperReviews = initSwipers('.reviews');
	}

});

window.addEventListener('resize', () => {

	if (window.matchMedia("(min-width: 768px)").matches && swiperGallery) {
		destroySwipers(swiperGallery);
	} else {
		swiperGallery = initSwipers('.benefits__gallery');
	}

	if (window.matchMedia("(min-width: 992px)").matches && swiperReviews) {
		destroySwipers(swiperReviews);
	} else {
		swiperReviews = initSwipers('.reviews');
	}

});

function initSwipers(swiperClass) {
	return new Swiper(swiperClass, {
		loop: true,
		speed: 500,
		spaceBetween: 100,
		autoplay: {
			delay: 5000,
		},
		grabCursor: true
	});
}

function destroySwipers(swiperName) {
	if (swiperName) {
		swiperName.destroy();

		if (swiperName === swiperGallery) {
			document.querySelector('.benefits__gallery').replaceWith(copyGallery);
			copyGallery = document.querySelector('.benefits__gallery').cloneNode(true);
		} else if (swiperName === swiperReviews) {
			document.querySelector('.reviews').replaceWith(copyReviews);
			copyReviews = document.querySelector('.reviews').cloneNode(true);
		}

		swiperName = null;
	}
}

function pageLoaded() {
	document.querySelector('.page').style.overflowY = 'auto';
	document.querySelector('.loader').style.display = 'none';
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