/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{pug,js}'],
	theme: {
		extend: {
			colors: {
				'neutral-black': 'rgba(6, 5, 15, 1)',
				'neutral-black-op4': 'rgba(6, 5, 15, 0.6)',
				'neutral-black-op3': 'rgba(6, 5, 15, 0.3)',
				'white-op5': 'rgba(255, 255, 255, 0.5)',
				'white-op3': 'rgba(255, 255, 255, 0.3)',
				'white-op15': 'rgba(255, 255, 255, 0.15)',
				yellow: 'rgba(232, 254, 116, 1)',
				purple: 'rgba(205, 165, 213, 1)',
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
