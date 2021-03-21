const expect = require('chai').expect;
const Plugin = require('./class')

describe('#nuxt-plugin', function () {
  const pluginDev = new Plugin.ImaginePlugin({namespace: 'imgine.space'}, true)

  const pluginProd = new Plugin.ImaginePlugin({
    namespace: 'imgine.space',
    endpoint: 'https://imgine.space/c/',
    staticEndpoint: 'https://host/'
  }, false)

  it('Dev format', function () {
    expect(pluginDev.format('/test/img.jpg')).to.equal('/imgine.space/test/img.jpg')
    expect(pluginDev.format('/test/img.jpg', { w: 100 })).to.equal('/imgine.space/test/img.jpg?w=100')
    expect(pluginDev.format('/test/img.jpg?w=10', { w: 100 })).to.equal('/imgine.space/test/img.jpg?w=100')
    expect(pluginDev.format('/test/img.jpg?w=10', { f: 'avif' })).to.equal('/imgine.space/test/img.jpg?w=10&f=avif')
  })

  it('Dev format favoriteFormat', function () {
    pluginDev.favoriteFormat = 'avif'
    expect(pluginDev.format('/test/img.jpg')).to.have.string('/imgine.space/test/img.jpg?f=avif')
    expect(pluginDev.format('/test/img.jpg', { f: 'avif '})).to.have.string('/imgine.space/test/img.jpg?f=avif')
    expect(pluginDev.format('/test/img.jpg?f=jpeg')).to.have.string('/imgine.space/test/img.jpg?f=jpeg')
    expect(pluginDev.format('/test/img.jpg', { w: 20, b: 20, f: null })).to.have.string('/imgine.space/test/img.jpg?w=20&b=20')
  })

  it('Prod format', function () {
    expect(pluginProd.format('/test/img.jpg')).to.have.string('https://imgine.space/c/https://host/test/img.jpg')
    expect(pluginProd.format('/test/img.jpg?f=jpeg')).to.have.string('https://imgine.space/c/https://host/test/img.jpg?f=jpeg')
  })
});
