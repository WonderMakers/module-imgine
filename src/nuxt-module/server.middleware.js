const NodeImagineConverter = require('../node-converter');
const URL = require('url');
const cache = []

module.exports = function (options) {
  const imageineSpacePath = `/${options.namespace}/`;
  const nodeImagineConverter = new NodeImagineConverter(options.sharp, {
    fetchCacheLimit: 100
  });

  return async function (req, res, next) {
    const isImagineSpaceRequest = req.url.search(imageineSpacePath) > -1
    if (isImagineSpaceRequest) {
      let url = req.url.replace(imageineSpacePath, '')
      const haveHost = url.search(/^https?:\/\//) > -1

      if (!haveHost) {
        url = `http://${req.headers.host}/` + url
      }
      const cacheIndex = cache.findIndex(item => item.url === url);
      let image
      if (cacheIndex > -1) {
        const resource = cache[cacheIndex]
        image = resource.image
      } else {
        const urlParse = URL.parse(url, true)
        image = await nodeImagineConverter.convert(url, urlParse.query)
        const resource = { image, url }

        if (image) {
          cache.push(resource)
        }
        if (cache.length > options.cacheLimit) {
          cache.splice(0, cache.length - options.cacheLimit)
        }
      }

      if (image) {
        res.setHeader('Content-Type', image.contentType)
        res.end(image.buffer)
        return
      }
    }
    next()
  }
};
