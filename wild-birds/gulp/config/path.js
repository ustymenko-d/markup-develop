import * as nodePath from 'path'

const rootFolder = nodePath.basename(nodePath.resolve())
const buildFolder = `./dist`
const srcFolder = `./src`

export const path = {
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},

	src: {
		html: `${srcFolder}/*.pug`,
		css: `${srcFolder}/css/index.scss`,
		js: `${srcFolder}/js/index.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		fonts: `${srcFolder}/fonts/`,
		files: `${srcFolder}/files/**/*.*`,
	},

	watch: {
		html: `${srcFolder}/**/*.pug`,
		css: [`${srcFolder}/**/*.scss`, `${srcFolder}/**/*.css`],
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,svg,ico,png,gif,webp}`,
		files: `${srcFolder}/files/**/*.*`,
	},

	clean: buildFolder,
	buildFolder,
	srcFolder,
	rootFolder,
}
