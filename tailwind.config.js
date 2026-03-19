/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff1e8',
          100: '#ffd9c2',
          200: '#ffc09a',
          400: '#fb923c',
          500: '#ea580c',
          600: '#c2410c',
          700: '#9a3412',
        },
        cream: {
          50: '#fffaf5',
          100: '#fff1e4',
        },
      },
    },
  },
  plugins: [],
}
