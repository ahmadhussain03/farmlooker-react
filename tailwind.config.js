module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#61BC5B',
          dark: '#008C97',
          light: '#DEF2F2'
        }
      },
      backgroundImage: theme => ({
        'farm': "url('../images/background.png')",
       })
    },
  },
  variants: {
    extend: {
    },
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
