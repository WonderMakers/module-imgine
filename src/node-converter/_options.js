module.exports = {
    f: {
      default: 'jpeg',
      type: String,
      validator: v => ['webp', 'avif', 'jpeg', 'png'].includes(v)
    },
    q: {
      default: 90,
      type: Number,
      max: 100,
      min: 0
    },
    r: {
      default: 0,
      type: Number,
      max: 360,
      min: 0
    },
    w: {
      default: null,
      type: Number,
      max: 4000,
      min: 0
    },
    h: {
      default: null,
      type: Number,
      max: 4000,
      min: 0
    },
    b: {
      default: 0,
      type: Number,
      min: 0,
      max: 1000
    }
};
