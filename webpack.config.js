const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),

  output: {
    library: 'MarkdownJSX',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: [
                      'last 2 versions'
                    ]
                  }
                }
              ],
              // '@babel/preset-env', // https://goo.gl/aAxYAq
              ['@babel/preset-react', {
                runtime: 'automatic'
              }] // https://goo.gl/4aEFV3
            ],

            // https://goo.gl/N9gaqc - List of Babel plugins.
            plugins: [
              '@babel/plugin-proposal-object-rest-spread', // https://goo.gl/LCHWnP
              '@babel/plugin-proposal-class-properties' // https://goo.gl/TE6TyG
            ]
          }
        }
      }
    ]
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
}
