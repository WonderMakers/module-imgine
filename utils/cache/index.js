const hash = require('object-hash');

class Cache {
  constructor (limit = 500) {
    this.limit = limit;
    this._cached = {};
    this._keys = [];
  }
  
  clear () {
    this._cached = {};
    this._keys = [];
  }
  
  clearLimit () {
    while (this._keys.length && this._keys.length > this.limit) {
      const key = this._keys.shift();
      delete this._cached[key];
    }
  }
  
  makeKey (query = {}) {
    const key = hash(query);
    return key;
  }
  
  add (query, result) {
    const key = this.makeKey(query);
    this._cached[key] = result;
    this._keys.push(key);
    this.clearLimit();
    return result;
  }
  
  remove (query) {
    const key = this.makeKey(query);
    const index = this._keys.findIndex(item => item === key);
    if (index > -1) {
      this._keys.splice(0, index);
    }
    delete this._cached[key];
  }
  
  get (query) {
    const key = this.makeKey(query);
    return this._cached[key] || null;
  }
}

module.exports = Cache;
