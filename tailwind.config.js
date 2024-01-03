/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
      times:['Times New Roman'],
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
        a4: '317mm',
      },
      height: {
        80: '80px',
        a4: '230mm',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://img.freepik.com/free-photo/upset-disappointed-female-entrepreneur-broker-suit-grimacing-pouting-displeased-sad-as-looking-pointing-upper-left-corner-uneasy-standing-white-background_1258-95962.jpg?w=1380&t=st=1701705389~exp=1701705989~hmac=aab6f9087a2998f5e12f96e3481d6cf984cb95e9adcf6760237f74d5d5ea7068')",
      },
    },
  },
  plugins: [
  ],
};
