const mailInput = document.querySelector('#contact-form__mail');
const mailPlaceholder = document.querySelector(
	'label[for="contact-form__mail"]'
);

mailInput.addEventListener('change', (e) => {
	e.target.value
		? mailPlaceholder.classList.add('input__placeholder_hidden')
		: mailPlaceholder.classList.remove('input__placeholder_hidden');
});
