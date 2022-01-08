module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
    ]
}