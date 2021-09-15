const { parseQuery, getOptions, interpolateName } = require('loader-utils')
const NodeImagineConverter = require('../node-converter/index.js');
const sharp = require('sharp');
const path = require('path');
const DEFAULTS = require('./options.json')

// const { validate } = require('schema-utils')
// const schema = require('./schema.json')

const nodeImagineConverter = new NodeImagineConverter(sharp, { fetchCacheLimit: 0 });


module.exports = async function (content) {
  const loaderCallback = this.async()
  const promises = []
  const { rootContext, resourcePath } = this
  const file = {
    buffer: content,
    url: resourcePath,
    ext: path.extname(resourcePath).replace(/\./, '')
  }
  
  if (typeof loaderCallback == 'undefined') {
    new Error('Imagine loader callback error')
    return
  }
  
  // Object representation of the query string
  const parsedResourceQuery = this.resourceQuery ? parseQuery(this.resourceQuery) : {}
  // Combines defaults, webpack options and query options,
  // later sources' properties overwrite earlier ones.
  const options = Object.assign({}, DEFAULTS, getOptions(this), parsedResourceQuery)
  options.sizes = normolizeSizes(options.sizes);
  options.formats.push(file.ext);
  options.formats = normolizeFormats(options.formats);
  
  options.formats.forEach(format => {
    options.sizes.forEach(size => {
      const transformOptions = {
        w: size,
        b: options.blur,
        r: options.rotate,
        q: options.quality,
        f: format
      }
      promises.push(generateFile.call(this, {
        rootContext,
        transformOptions,
        name: options.name,
        file
      }))
    })
  })
  const placeholder = await generateFile.call(this, {
    rootContext,
    name: options.name,
    file,
    transformOptions: { w: 40, b: 2, r: options.rotate, f: file.ext }
  })
  const original = await generateFile.call(this, {
    rootContext,
    name: options.name,
    file,
    transformOptions: { r: options.rotate, f: file.ext }
  })
  // validate(schema, options, { name: 'Imagine Loader' })
  
  Promise.all(promises).then((results) => {
    const formats = options.formats.map(format => {
      const images = results.filter(image => image.format === format)
      if (images.length) {
        return `{ format: "${format}", type: "${images[0].type}", srcset: ${images.map(image => image.srcset).join('+","+') }}`
      } else {
        return null
      }
    }).filter(Boolean)
    const result = `${options.esModule ? 'export default' : 'module.exports ='} {
        formats: [${formats}],
        original: ${toStringImageData(original)},
        placeholder: ${toStringImageData(placeholder)},
        toString: function(){return ${original.path}},
      }`
    loaderCallback(null, result)
  })
}

async function generateFile ({ file, rootContext, name, transformOptions }) {
  const nameTemplate = name
    .replace(/\[ext\]/gi, transformOptions.f)
    .replace(/\[width\]/gi, transformOptions.w || '')
  const fileName = interpolateName(this, nameTemplate, {
    context: rootContext,
    content: file.buffer
  })
  const result = await nodeImagineConverter.sharping({
    url: file.url,
    buffer: file.url
  }, transformOptions)
  
  let outputPath = path.posix.join('', fileName)
  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`
  
  if (result) {
    this.emitFile(outputPath, result.buffer, null)
    return {
      path: publicPath,
      srcset: publicPath + `+${JSON.stringify(` ${transformOptions.w}w`)}`,
      width: transformOptions.w,
      type: result.contentType,
      format: result.format
    }
  }
}

function toStringImageData (imageData) {
  return `{ path: ${imageData.path}${imageData.width ? `, width: ${imageData.width}` : ''}, format: "${imageData.format}", type: "${imageData.type}" }`
}

function normolizeSizes (sizes = []) {
  return sizes.reduce((result, size) => {
    if (!result.includes(size)) {
      result.push(size)
    }
    return result
  }, []).sort()
}

function normolizeFormats (formats = []) {
  const sortIndex = function (format) {
    switch (format) {
      case 'avif': return 0;
      case 'webp': return 1;
      default: return 2;
    }
  }
  const renameFormat = function (name) {
    name = name.toLocaleString()
    switch (name) {
      case 'jpg': return 'jpeg';
      default: return name;
    }
  }
  return formats.reduce((result, format) => {
    format = renameFormat(format)
    if (!result.includes(format)) {
      result.push(format)
    }
    return result
  }, []).sort((a, b) => sortIndex(a) - sortIndex(b))
}
