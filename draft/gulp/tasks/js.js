import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: true })
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(uglify())
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}