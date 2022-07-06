// 用于覆盖webpack的配置
const { override, addWebpackAlias } = require('customize-cra')

// 配置别名
const path = require('path')
const alias = addWebpackAlias({
  '@': path.join(__dirname, 'src'),
  '@scss': path.join(__dirname, 'src/assets/styles')
})

const pxToViewport = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false // (Boolean) Allow px to be converted in media queries.
      })
    ]
  })
  return config
}

module.exports = override(alias, pxToViewport)
