const galleryLinks = document.querySelectorAll('a.gallery__card-link');

if (galleryLinks) {
	galleryLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			const modalToOpen = e.currentTarget.nextElementSibling;

			modalToOpen.showModal();

			// Animation
			const onAnimationEnd = () => {
				modalToOpen.classList.remove('hide');
				modalToOpen.close();
				modalToOpen.removeEventListener('animationend', onAnimationEnd);
			};
			// =========

			// Backdrop close
			const handleBackdropClick = (e) => {
				const modalRect = modalToOpen.getBoundingClientRect();

				if (e.clientX < modalRect.left || e.clientX > modalRect.right || e.clientY < modalRect.top || e.clientY > modalRect.bottom) {
					modalToOpen.classList.add('hide');
					modalToOpen.addEventListener('animationend', onAnimationEnd);
				}
			};
			modalToOpen.addEventListener('click', handleBackdropClick);
			// ==============

			const modalCloseButton = modalToOpen.querySelector('.modal__close-btn');

			modalCloseButton.addEventListener('click', (e) => {
				modalToOpen.classList.add('hide');
				modalToOpen.addEventListener('animationend', onAnimationEnd);
			});
		});
	});
}
