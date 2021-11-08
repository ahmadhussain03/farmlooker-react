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
          light: '#DEF2F2',
          side: '#23533b',
          900: '#2E5E12',
          100: '#AEF6C9',
          200: '#01C1C3'
        },
        green: {
          primary: '#26AA20'
        },
        yellow: {
          primary: '#FF9C00'
        },
        black: {
          primary: '#2A1F2A'
        },
        custom: {
          primary: '#E8E0B6',
          secondary: '#523F1D'
        }
      },
      backgroundImage: theme => ({
        'farm': "url('../images/background.png')",
       })
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '10': '10px',
      '12': '12px'
    }
  },
  variants: {
    extend: {
      border: ['focus']
    },
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
