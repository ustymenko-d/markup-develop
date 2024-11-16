const form = document.forms[0];

if (form) {
	const inputToggler = form.querySelector('#input-toggler');

	inputToggler.addEventListener('click', (e) => {
		if (e.target.classList.contains('toggler__button_active')) {
			return;
		} else {
			toggleInputType(inputToggler);

			inputToggler.querySelectorAll('.toggler__button').forEach((btn) => {
				btn.classList.toggle('toggler__button_active');
			});
		}
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		alert('Successful! (In fact, nothing was sent anywhere)');
	});
}

function toggleInputType(toggler) {
	const targetType = toggler.dataset.inputType;
	const changeInput = form.querySelector(`[type="${targetType}"]`);

	const newName = targetType === 'tel' ? 'mail' : 'phone';
	const newType = targetType === 'tel' ? 'email' : 'tel';
	const newPlaceholder = targetType === 'tel' ? 'username@mail.com' : '+0(123) 456-7890';
	const newpattern = targetType === 'tel' ? '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$' : '[0-9]{11}';

	toggler.dataset.inputType = newType;
	changeInput.setAttribute('name', newName);
	changeInput.setAttribute('placeholder', newPlaceholder);
	changeInput.setAttribute('pattern', newpattern);
	changeInput.setAttribute('type', newType);
}
