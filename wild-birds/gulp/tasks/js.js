import webpack from 'webpack-stream'

export const js = () =>
	app.gulp
		.src(app.path.src.js, { allowEmpty: true })
		.pipe(
			webpack({
				mode: 'production',
				devtool: false,
				output: { filename: 'index.min.js' },
				module: {
					rules: [
						{
							test: /\.(sass|less|css)$/,
							use: ['style-loader', 'css-loader', 'sass-loader'],
						},
						{
							test: /\.js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: ['@babel/preset-env'],
									plugins: ['@babel/plugin-transform-runtime'],
								},
							},
						},
					],
				},
				optimization: { minimize: true },
				resolve: { extensions: ['.js'] },
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream())
