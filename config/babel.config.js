const env = process.env.BABEL_ENV || process.env.NODE_ENV

const presets = ['@babel/preset-react', '@babel/preset-typescript']
const plugins = ['@babel/plugin-proposal-class-properties']

if (env === 'production') {
  presets.push([
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 1 Chrome version'],
      },
      modules: 'commonjs',
      loose: true,
    },
  ])
  plugins.push('@babel/plugin-proposal-object-rest-spread')
}

if (env === 'development') {
  plugins.push('@babel/plugin-transform-react-jsx-source')
}

if (env === 'test') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = {
  presets,
  plugins,
}
