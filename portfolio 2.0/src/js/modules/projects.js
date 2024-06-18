export const showProjectDesc = () => {
	let workBlock = document.querySelector('.work__bottom');
	let allDescription = workBlock.querySelectorAll('.description__item');

	workBlock.addEventListener('mouseover', (e) => {
		if (document.activeElement && e.target.id) document.activeElement.blur();
		if (e.target.id) showItem(getItemID(e.target.id));
	});

	workBlock.addEventListener('mouseout', (e) => {
		if (e.target.id) hideItem(getItemID(e.target.id));
	});

	workBlock.addEventListener('focusin', (e) => {
		allDescription.forEach((item) => {
			if (item.classList.contains('show')) hideItem(item);
		});
		if (e.target.id) showItem(getItemID(e.target.id));
	});

	workBlock.addEventListener('focusout', (e) => {
		if (e.target.id) hideItem(getItemID(e.target.id));
	});
};

function getItemID(elem) {
	let targetID = elem.split('Link').join('') + 'Item';
	return document.querySelector(`#${targetID}`);
}

function showItem(item) {
	item.classList.add('show');
}

function hideItem(item) {
	item.classList.remove('show');
}
