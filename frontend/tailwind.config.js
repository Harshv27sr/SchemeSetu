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
        // Redefined govblue to act as the primary Bright/Dark Green theme
        govblue: {
          50: '#f0fcf1',
          100: '#dbf8df',
          200: '#baf0c2',
          300: '#87e394',
          400: '#4bcc5d',
          500: '#21b537',
          600: '#09ad09', // Primary Bright Green
          700: '#118117',
          800: '#136519',
          900: '#0a3718', // Primary Dark Green
          950: '#06200d',
        },
        // Redefined govgreen to act as the secondary Pink/Magenta theme
        govgreen: {
          50: '#fdf2f8',
          100: '#fbe6f2',
          200: '#f8cbe4',
          300: '#f2a2cd',
          400: '#e86baf',
          500: '#d43684', // Primary Pink/Magenta
          600: '#c1216d',
          700: '#a51759',
          800: '#89164c',
          900: '#721641',
          950: '#450924',
        },
        // Custom Grey overriding slate to match #696d62
        slate: {
          50: '#f7f8f6',
          100: '#edf0ec',
          200: '#d7dad3',
          300: '#b8beb3',
          400: '#949b8e',
          500: '#767e6f',
          600: '#696d62', // Target Grey
          700: '#4e554a',
          800: '#40453d',
          900: '#363933',
          950: '#1d1f1c',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
