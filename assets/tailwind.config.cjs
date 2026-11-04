module.exports = {
  content: ['./index.html'],
  theme: { extend: {
    fontFamily: { sans: ['DM Sans', 'Arial', 'sans-serif'], mono: ['DM Sans', 'Arial', 'sans-serif'] },
    colors: {
      rustic: { bg: '#090d13', dark: '#f1eee8', accent: '#a8afb8', border: '#343d48' },
      leaf: '#3e5547', water: '#28465a', clay: '#c7a375', sage: '#6d644c', dustyBlue: '#34566d',
      gray: { 100: '#151d29', 200: '#1c2633', 700: '#b9bfc7' }
    },
    textColor: { leaf: '#b7c8b7', sage: '#c8bb98', dustyBlue: '#a8c1d4', water: '#cfdae5' },
    backgroundColor: { 'rustic-dark': '#04070c' }
  } }
};
