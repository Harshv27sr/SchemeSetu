/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Support optional dark mode
  theme: {
    extend: {
      colors: {
        govblue: {
          50: '#f0f6fc',
          100: '#e1eef9',
          200: '#bcdcf3',
          300: '#83bde9',
          400: '#439adb',
          500: '#1d7fc4',
          600: '#1064a3',
          700: '#0f5083',
          800: '#10456e',
          900: '#123b5c',
          950: '#0c263e',
        },
        govgreen: {
          50: '#f2fcf5',
          100: '#e2fae9',
          200: '#c5f3d3',
          300: '#97e8af',
          400: '#5ed481',
          500: '#38b95f',
          600: '#29994b',
          700: '#23783e',
          800: '#205f34',
          900: '#1c4e2d',
          950: '#0b2b15',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
