const defaultOptions = require('./options')
const path = require('path')

export default function (moduleOptions = {}) {
  const { nuxt } = this
  const options = Object.assign({}, defaultOptions, this.options.imgine, moduleOptions)

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
