/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{pug,js}'],
	theme: {
		extend: {
			colors: {
				'neutral-black': 'rgb(6, 5, 15)',
				'neutral-black-op9': 'rgba(6, 5, 15, 0.9)',
				'neutral-black-op8': 'rgba(6, 5, 15, 0.81)',
				'neutral-black-op6': 'rgba(6, 5, 15, 0.6)',
				'neutral-black-op3': 'rgba(6, 5, 15, 0.3)',
				'white-op5': 'rgba(255, 255, 255, 0.5)',
				'white-op3': 'rgba(255, 255, 255, 0.3)',
				'white-op15': 'rgba(255, 255, 255, 0.15)',
				yellow: 'rgb(232, 254, 116)',
				purple: 'rgb(205, 165, 213)',
			},
			fontFamily: {
				regular: ['SchibstedGrotesk-Regular', 'sans-serif'],
				medium: ['SchibstedGrotesk-Medium', 'sans-serif'],
			},
			borderRadius: {
				'5p': '1.25rem',
			},
		},
	},
	plugins: [],
}
