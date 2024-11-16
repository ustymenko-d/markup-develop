document.querySelector('.accordion').addEventListener('click', (e) => {
	if (e.target.classList.contains('accordion-item__trigger') || e.target.closest('.accordion-item__trigger')) {
		const parentItem = e.target.closest('.accordion-item');
		const parentTrigger = parentItem.querySelector('.accordion-item__trigger');
		const triggerButton = parentTrigger.querySelector('.accordion-item__button');
		const contentLink = parentItem.querySelector('.accordion-item__link');

		parentItem.classList.toggle('accordion-item_active');

		triggerButton.getAttribute('aria-expanded') === 'false' ? triggerButton.setAttribute('aria-expanded', true) : triggerButton.setAttribute('aria-expanded', false);

		// Collapsible content element
		parentItem.querySelector('.accordion-item__content').classList.toggle('collapsible_collapsed');

		contentLink.tabIndex === -1 ? (contentLink.tabIndex = 0) : contentLink.tabIndex === -1;
	}
});
