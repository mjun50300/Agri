module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          light: '#F8F9FA',
          border: '#E5E7EB',
        },
        lime: {
          50: '#F7FEE7',
          100: '#ECFCCB',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#84CC16', // Lime Green
          600: '#65A30D',
          700: '#4D7C0F',
        },
        darkGrayText: '#374151',
        goldAccent: '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'system-ui'],
      },
      borderRadius: {
        'card': '18px',
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 10px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
