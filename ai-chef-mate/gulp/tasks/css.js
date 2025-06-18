export const css = () =>
	app.gulp
		.src(app.path.src.css, { sourcemaps: true })
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream())
