// Accordion
function initAccordion(accordion) {
	accordion.addEventListener('click', (e) => {
		if (e.target.classList.contains('accordion-item__trigger')) {
			const parentItem = e.target.closest('.accordion-item');

			if (parentItem.classList.contains('accordion-item__active')) {
				parentItem.classList.remove('accordion-item__active');
				e.target.setAttribute('aria-expanded', false);
				parentItem
					.querySelector('.accordion-item__content')
					.classList.toggle('collapsible_collapsed');
			} else {
				accordion.querySelectorAll('.accordion-item').forEach((item) => {
					if (item.classList.contains('accordion-item__active')) {
						item.classList.remove('accordion-item__active');
						item
							.querySelector('.accordion-item__trigger')
							.setAttribute('aria-expanded', false);
						item
							.querySelector('.accordion-item__content')
							.classList.toggle('collapsible_collapsed');
					}
				});

				parentItem.classList.add('accordion-item__active');
				e.target.setAttribute('aria-expanded', true);
				parentItem
					.querySelector('.accordion-item__content')
					.classList.toggle('collapsible_collapsed');
			}
		}
	});
}

initAccordion(document.querySelector('.accordion'));

// hero cards
const heroItems = document.querySelectorAll('.hero-cards__item');

heroItems.forEach((item) => {
	item.addEventListener('click', (e) => {
		if (e.currentTarget.dataset.active === 'false') {
			heroItems.forEach((item) => {
				if (item.dataset.active === 'true') item.dataset.active = 'false';
			});

			e.currentTarget.dataset.active = 'true';
		}
	});
	item.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			if (e.currentTarget.dataset.active === 'false') {
				heroItems.forEach((item) => {
					if (item.dataset.active === 'true') item.dataset.active = 'false';
				});

				e.currentTarget.dataset.active = 'true';
			}
		}
	});
});
