import './modules/theme-switch.js';
import { hideLoader } from './modules/loader.js';
import { cursorInit } from './modules/cursor.js';
import { animationInit } from './modules/animation.js';
import { showProjectDesc } from './modules/projects.js';
import { swiperInit } from './modules/swiperInit.js';

window.addEventListener('load', () => {
	hideLoader();
	swiperInit();
	animationInit();
	showProjectDesc();
	cursorInit();
});
