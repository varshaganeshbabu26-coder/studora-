/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#000000',
          100: '#000000',
          200: '#A67C52',
          300: '#A67C52',
          400: '#A67C52',
          500: '#A67C52',
          600: '#A67C52',
          700: '#A67C52',
          800: '#A67C52',
          900: '#A67C52',
        },
      },
    },
  },
  plugins: [],
}
