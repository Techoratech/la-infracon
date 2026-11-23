/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        ivory: '#FAF7F2',
        beige: {
          DEFAULT: '#E8DFD0',
          light: '#F3EDE3',
          dark: '#DDD0BE',
        },
        sand: {
          DEFAULT: '#CDBFA8',
          light: '#DFD5C4',
          dark: '#B8A88E',
        },
        taupe: {
          DEFAULT: '#8C7B66',
          light: '#A79782',
          dark: '#6E5F4C',
        },
        black: {
          DEFAULT: '#0B0B0B',
          soft: '#141414',
          muted: '#222222',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#262626',
          dark: '#121212',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.08)',
        'luxury-sm': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'luxury-lg': '0 30px 80px rgba(0, 0, 0, 0.12)',
        'glass-light': '0 8px 32px 0 rgba(140, 123, 102, 0.12)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
}
