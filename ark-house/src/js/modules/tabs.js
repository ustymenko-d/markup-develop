class TabsManual {
	constructor(groupNode) {
		this.tablistNode = groupNode;

		this.tabs = [];

		this.firstTab = null;
		this.lastTab = null;

		this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
		this.tabpanels = [];

		for (let i = 0; i < this.tabs.length; i++) {
			let tab = this.tabs[i];
			let tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

			tab.tabIndex = -1;
			tab.setAttribute('aria-selected', 'false');
			this.tabpanels.push(tabpanel);

			tab.addEventListener('keydown', this.onKeydown.bind(this));
			tab.addEventListener('click', this.onClick.bind(this));

			if (!this.firstTab) {
				this.firstTab = tab;
			}
			this.lastTab = tab;
		}

		this.setSelectedTab(this.firstTab);
	}

	setSelectedTab(currentTab) {
		for (let i = 0; i < this.tabs.length; i++) {
			let tab = this.tabs[i];
			if (currentTab === tab) {
				tab.setAttribute('aria-selected', 'true');
				tab.removeAttribute('tabindex');
				tab.classList.add('tabs__item_active');
				this.tabpanels[i].classList.remove('is-hidden');
			} else {
				tab.setAttribute('aria-selected', 'false');
				tab.tabIndex = -1;
				tab.classList.remove('tabs__item_active');
				this.tabpanels[i].classList.add('is-hidden');
			}
		}
	}

	moveFocusToTab(currentTab) {
		currentTab.focus();
	}

	moveFocusToPreviousTab(currentTab) {
		let index;

		if (currentTab === this.firstTab) {
			this.moveFocusToTab(this.lastTab);
		} else {
			index = this.tabs.indexOf(currentTab);
			this.moveFocusToTab(this.tabs[index - 1]);
		}
	}

	moveFocusToNextTab(currentTab) {
		let index;

		if (currentTab === this.lastTab) {
			this.moveFocusToTab(this.firstTab);
		} else {
			index = this.tabs.indexOf(currentTab);
			this.moveFocusToTab(this.tabs[index + 1]);
		}
	}

	// EVENT HANDLERS

	onKeydown(event) {
		let tgt = event.currentTarget,
			flag = false;

		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowLeft':
				this.moveFocusToPreviousTab(tgt);
				flag = true;
				break;

			case 'ArrowDown':
			case 'ArrowRight':
				this.moveFocusToNextTab(tgt);
				flag = true;
				break;

			case 'Home':
				this.moveFocusToTab(this.firstTab);
				flag = true;
				break;

			case 'End':
				this.moveFocusToTab(this.lastTab);
				flag = true;
				break;

			default:
				break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	onClick(event) {
		this.setSelectedTab(event.currentTarget);
	}
}

window.addEventListener('load', function () {
	let tablists = document.querySelectorAll('[role=tablist].tabs__list');
	for (let i = 0; i < tablists.length; i++) {
		new TabsManual(tablists[i]);
	}
});
