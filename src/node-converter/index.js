const fetch = require('node-fetch');
const math = require('./../../utils/math');
const optionsConfig = require('./_options.js');

module.exports = class NodeConverterImage {
  constructor (sharp, options) {
    this.options = Object.assign({}, {
      fetchCacheLimit: 100
    }, options);

    this.sharp = sharp;
    this.fetchCache = [];
  }

  async fetchResource (url) {
    try {
      const index = this.fetchCache.findIndex(item => item.url === url);
      if (index > -1) {
        return this.fetchCache[index];
      } else {
        const result = await fetch.default(url);
        const buffer = await result.buffer();
        const resource = {buffer, url};
        this.fetchCache.push(resource);
        if (this.fetchCache.length > this.options.fetchCacheLimit) {
          cache.splice(0, this.fetchCache.length - this.options.fetchCacheLimit);
        }
        return resource;
      }
    } catch (e) {
      return null;
    }
  }

  async convert (url, _options = {}) {
    const file = await this.fetchResource(url);
    const options = this.makeConvertingOptions(_options);

    if (!file) {
      return null;
    }

    const result = this.sharp(file.buffer);

    try {
      if (options.r) {
        result.rotate(options.r);
      }

      if (options.b) {
        result.blur(options.b);
      }

      result.resize({
        width: options.w,
        height: options.h
      });

      result.toFormat(options.f, { quality: options.q });

      const buffer = await result.toBuffer();
      const contentType = `image/${ options.f }`;
      const format = options.f;

      return { buffer, contentType, format };
    } catch (e) {
      return null;
    }
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
