/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'imperial-gold': '#C99738',
        'burnished-bronze': '#8B601C',
        'cerulean': '#0073B7',
        'deep-marine': '#0D3B66',
        'emerald-care': '#0A8754',
        'emerald-hover': '#075F3B',
        'slate-dark': '#1E293B',
        'mist': '#F1F5F9',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'btn': '6px',
        'card': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 59, 102, 0.06)',
        'soft-hover': '0 12px 30px -4px rgba(13, 59, 102, 0.12)',
        'glow-cerulean': '0 0 24px -2px rgba(0, 115, 183, 0.35)',
        'glow-emerald': '0 0 24px -2px rgba(10, 135, 84, 0.35)',
        'glow-gold': '0 0 24px -2px rgba(201, 151, 56, 0.35)',
      }
    }
  },
  plugins: [],
}
