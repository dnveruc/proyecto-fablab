module.exports = {
  content: ['./index.html', './assets/bitacora-data.js', './assets/app.js'],
  theme: { extend: {
    fontFamily: { sans: ['DM Sans', 'Arial', 'sans-serif'], mono: ['DM Sans', 'Arial', 'sans-serif'] },
    colors: {
      rustic: { bg: '#efeee8', dark: '#18222c', accent: '#5d6872', border: '#ccd0c8' },
      leaf: '#3e5547', water: '#28465a', clay: '#c7a375', sage: '#6d644c', dustyBlue: '#34566d',
      gray: { 100: '#e9ece7', 200: '#e0e4dd', 700: '#515e68' }
    },
    textColor: { leaf: '#36533e', sage: '#4d5d37', dustyBlue: '#254dde', water: '#264476' },
    backgroundColor: { 'rustic-dark': '#04070c' }
  } }
};
