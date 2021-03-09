export default {
  props: {
    width: {
      type: [String, Number],
      default: 1
    },
    height: {
      type: [String, Number],
      default: 0.66
    },
    formats: {
      type: Array,
      default: () => ['avif', 'webp'],
      validate: v => ['avif', 'webp', 'png', 'jpeg'].includes(v)
    },
    placeholder: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      default: ''
    },
    /**
     * Сетка размеров
     * Формирует необходимые размеры для запросов
     */
    map: {
      type: Array,
      default: () => [360, 640, 730, 960, 1280, 1536, 1920, 2048]
    },
    /**
     * Example: ['(max-width: 1920px) 100vw', '(min-width: 1921px) 2048px', '1920px']
     */
    sizes: {
      type: Array,
      default: () => ['100vw']
    },
    loading: {
      type: String,
      default: '',
      validate: v => ['auto', 'lazy', 'eager', ''].includes(v)
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
