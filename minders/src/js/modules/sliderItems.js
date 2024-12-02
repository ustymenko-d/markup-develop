const allSliderItems = document.querySelectorAll('.sliderItem')

const toggleActive = (item) => {
	// allSliderItems.forEach((sliderItem) => sliderItem.classList.remove('active'));
	item.classList.toggle('sliderItem_active')
}

allSliderItems.forEach((item) => {
	item.addEventListener('click', () => {
		toggleActive(item)
	})
})
