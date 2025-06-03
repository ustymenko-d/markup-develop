const form = document.forms[0]
const inputs = form.querySelectorAll('input')
const submitBtn = form.querySelector('.form__button')

const toggleLabelState = (input) => {
	const label = input.nextElementSibling
	if (!label) return

	label.classList.toggle('form__label_not-empty', input.value !== '')
}

const setHintState = (input, show) => {
	input.parentElement.classList.toggle('form__input-wrapper_hint', show)
}

const setInvalidState = (input, invalid) => {
	const wrapper = input.parentElement
	wrapper.classList.toggle('form__input-wrapper_invalid', invalid)
	input.classList.toggle('form__input_invalid', invalid)
}

const handleBlur = (e) => {
	const input = e.target
	if (input.required && !input.value.trim()) {
		setHintState(input, true)
	} else {
		setHintState(input, false)
	}
}

const handleChange = (e) => toggleLabelState(e.target)

const handleInput = (e) => {
	if (e.target.value.trim()) {
		setInvalidState(e.target, false)
	}
}

const validateInputs = () => {
	let isValid = true
	inputs.forEach((input) => {
		if (!input.checkValidity()) {
			setInvalidState(input, true)
			setHintState(input, true)
			isValid = false
		}
	})
	return isValid
}

const handleSubmit = (e) => {
	e.preventDefault()
	if (validateInputs()) {
		form.submit()
	}
}

inputs.forEach((input) => {
	input.addEventListener('blur', handleBlur)
	input.addEventListener('change', handleChange)
	input.addEventListener('input', handleInput)
})

submitBtn.addEventListener('click', handleSubmit)
