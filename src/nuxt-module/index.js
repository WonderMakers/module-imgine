const defaultOptions = require('./options')
const path = require('path')

export default function (moduleOptions = {}) {
  const { nuxt } = this
  const options = Object.assign({}, defaultOptions, this.options.imgine, moduleOptions)
  
  this.extendBuild((config, { isClient, isServer }) => {
    const existingImageLoader = config.module.rules.find(
      rule =>
        rule.test.test('.png') &&
        rule.test.test('.jpg') &&
        rule.test.test('.gif') &&
        rule.test.test('.webp') &&
        rule.test.test('.svg')
    )
    
    /* If the image loader rule has been removed or edited then we cannot continue.
     ** It is not clear how to update the webpack rules.
     ** The user should define a custom webpack configuration.
     */
    if (!existingImageLoader) {
      throw new Error(
        [
          'Could not find the existing image loader rule.',
          ' The webpack config has been edited, perhaps by another Nuxt module.',
          ' To resolve this error try placing this module first in your Nuxt modules array',
          ' or use a custom webpack configuration instead.'
        ].join('')
      )
    }
    
    /* Update the loader so it's no longer respo∏nsible for png/jpg/webp files */
    if (existingImageLoader) {
      existingImageLoader.test = /\.(svg|gif)$/i
    }
    
    /* Add the new loader rule */
    config.module.rules.push({
      test: /\.(png|jpe?g|webp)$/,
      loader: 'imgine/loader',
      // options: DEFAULT_RESPONSIVE_LOADER_OPTIONS
    })
  })
  
  this.addPlugin({
    src: path.resolve(__dirname, 'nuxt.imagine.plugin.js'),
    fileName: 'imagine.plugin.js',
    options
  })

  // Don't start ngrok in production
  if (nuxt.options.dev === false) {
    return
  }

  const serverMiddleware = require('./server.middleware')
  
  this.addServerMiddleware(
    serverMiddleware(options)
  )

  // https://nuxtjs.org/docs/2.x/internals-glossary/internals-nuxt#hooks
}
