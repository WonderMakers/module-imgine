const fetch = require('node-fetch');
const math = require('./../../utils/math');
const optionsConfig = require('./_options.js');
const Cache = require('../../utils/cache');

module.exports = class NodeConverterImage {
  constructor (sharp, options) {
    this.options = Object.assign({}, {
      fetchCacheLimit: 100
    }, options);
  
    this.sharp = sharp;
    this.cache = {
      upload: new Cache(options.fetchCacheLimit),
      sharping: new Cache(options.fetchCacheLimit)
    };
  }

  async fetchResource (url) {
    const query = { url };
    const cache = this.cache.upload.get(query);
    
    return cache || this.cache.upload.add(query, new Promise(async (resolve) => {
      try {
        const result = await fetch.default(url);
        const buffer = await result.buffer();
        resolve({ buffer, url });
      } catch (e) {
        resolve(null);
        this.cache.upload.remove(query);
      }
    }));
  }
  
  async sharping (file, _options) {
    const options = this.makeConvertingOptions(_options);
    const query = { url: file.url, ...options };
    const cache = this.cache.sharping.get(query);
  
    if (cache) {
      return cache
    } else {
      try {
        const result = this.sharp(file.buffer);
        if (options.r) {
          result.rotate(options.r);
        }
        if (options.b) {
          result.blur(options.b);
        }
        result.resize({ width: options.w, height: options.h });
        result.toFormat(options.f, { quality: options.q });
    
        const buffer = await result.toBuffer();
        const contentType = `image/${ options.f }`;
        const format = options.f;
  
        return this.cache.sharping.add(query, { buffer, contentType, format });
      } catch (e) {
        console.log('Sharping error:', e)
        return null;
      }
    }
  }

  async convert (url, _options = {}) {
    const file = await this.fetchResource(url);
    return file
      ? this.sharping(file, _options)
      : Promise.resolve(null);
  }

  makeConvertingOptions (options) {
    return Object.keys(optionsConfig).reduce((result, key) => {
      const validator = optionsConfig[key].validator;
      const type = optionsConfig[key].type;
      const _default = optionsConfig[key].default;
      const value = options[key];
      if (type === Number) {
        result[key] = +math.clamp(0, 6000, value) || _default;
        return result;
      } else if (type === String) {
        if (validator) {
          result[key] = validator(value) ? value : _default;
          return result
        } else {
          result[key] = value;
          return result
        }
      } else {
        return result;
      }
    }, {})
  }
};
