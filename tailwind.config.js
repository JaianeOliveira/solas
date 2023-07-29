/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				jost: ['Jost', 'sans-serif'],
				beckman: ['Beckman', 'sans-serif'],
			},
			keyframes: {
				slideLeft: {
					'0%': {
						'-webkit-transform': 'translateX(0)',
						transform: 'translateX(40vw)',
					},
					'100%': {
						'-webkit-transform': 'translateX(-100px)',
						transform: 'translateX(0)',
					},
				},
				slideRight: {
					'0%': {
						'-webkit-transform': 'translateX(0)',
						transform: 'translateX(0)',
					},
					'100%': {
						'-webkit-transform': 'translateX(-100px)',
						transform: 'translateX(40vw)',
					},
				},
			},
			animation: {
				slideLeft:
					'slideLeft 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',

				slideRight:
					'slideRight 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
			},
		},
	},
	plugins: [],
};
