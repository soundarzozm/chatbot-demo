/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				apercu: [
					'Apercu',
					'Source Sans Pro',
					'system',
					'system-ui',
					'-apple-system',
					'linkMacSystemFont',
					'Roboto',
					'Helvetica',
					'Arial',
					'sans-serif',
				],
				inter: ['Inter', 'sans-serif'],
			},
			keyframes: {
				'tw-bounce': {
					'0%, 60%, 100%': {
						transform: 'translateY(0)',
					},
					'30%': {
						transform: 'translateY(-4px)',
					},
				},
			},
			animation: {
				'tw-loading': 'tw-bounce 3s linear infinite',
			},
		},
	},
	plugins: [],
}
