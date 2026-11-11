/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sunset: {
          50: '#fffdfa',
          100: '#fef3e2',
          200: '#fce4c1',
          300: '#f8cc93',
          400: '#f3aa60',
          500: '#eb8634',
          600: '#dc6b1f',
          700: '#b74f17',
          800: '#923e1b',
          900: '#763419',
        },
        gold: {
          light: '#f7e7ce',
          DEFAULT: '#d4af37',
          dark: '#aa820a',
        },
        navy: {
          800: '#1b263b',
          900: '#0d1b2a',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
