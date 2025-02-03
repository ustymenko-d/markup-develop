const allTeammates = document.querySelectorAll('.teammate')

const toggleActive = (item) => {
	item.classList.toggle('teammate_active')
}

allTeammates.forEach((item) => {
	item.addEventListener('click', () => toggleActive(item))
})
