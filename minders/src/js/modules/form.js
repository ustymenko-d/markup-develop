const form = document.forms[0]
const inputs = form.querySelectorAll('input')
const submitBtn = form.querySelector('.form__button')

const checkEmptyInput = (target) => {
	if (target.value !== '') {
		target.nextElementSibling.classList.add('form__label_not-empty')
	} else {
		target.nextElementSibling.classList.remove('form__label_not-empty')
	}
}

const removeError = (target) => {
	target.parentElement.classList.remove('form__input-wrapper_invalid')
	target.classList.remove('form__input_invalid')
}

inputs.forEach((el) => {
	el.addEventListener('blur', (e) => {
		if (e.target.required && !e.target.value) {
			e.target.parentElement.classList.add('form__input-wrapper_hint')
		} else {
			e.target.parentElement.classList.remove('form__input-wrapper_hint')
		}
	})
	el.addEventListener('change', (e) => {
		checkEmptyInput(e.target)
	})
	el.addEventListener('input', (e) => {
		if (!!e.target.value) removeError(e.target)
	})
})

submitBtn.addEventListener('click', (e) => {
	e.preventDefault()

	inputs.forEach((el) => {
		if (!el.checkValidity()) {
			el.parentElement.classList.add('form__input-wrapper_invalid')
			el.parentElement.classList.add('form__input-wrapper_hint')
			el.classList.add('form__input_invalid')
		}
	})
	if (form.checkValidity()) form.submit()
})
