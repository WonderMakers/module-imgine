const avifData = 'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA='
const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA='

export class ImaginePlugin {
  constructor (options, isDev) {
    this.isDev = isDev
    this.options = options
    this.favoriteFormat = null
    this.setup()
  }

  setup () {
    if (process.client) {
      this.checkSupports()
    }
  }

  async checkSupports () {
    this.isSupporAvif = await this.isSupportImageData(avifData)
    this.isSupportWebp = await this.isSupportImageData(webpData)
    if (this.isSupporAvif) {
      document.documentElement.classList.add('avif')
      this.favoriteFormat = 'avif'
    } else if (this.isSupportWebp) {
      document.documentElement.classList.add('webp')
      this.favoriteFormat = 'webp'
    }
  }

  async isSupportImageData (imageData) {
    if (!createImageBitmap) return false
    const blob = await fetch(imageData).then((r) => r.blob())
    return createImageBitmap(blob).then(() => true, () => false)
  }

  format (imageUrl = '', extendQuery = {}) {
    const endpoint = this.isDev ? `/${this.options.namespace}/` : this.options.endpoint
    const haveHost = imageUrl.search(/^https?:\/\//) > -1

    let url = imageUrl.replace(/^\//, '').replace(/\?.+$/, '')
    let query = this.getQuery(imageUrl, extendQuery)

    if (this.favoriteFormat && extendQuery.f === undefined && !query.f) {
      query.f = this.favoriteFormat
    }

    if (!haveHost && !this.isDev) {
      url = this.options.staticEndpoint + url
    }

    return endpoint + url + this.getQueryString(query)
  }

  getQuery (url, extendQuery = {}) {
    const search = url.match(/\?(.+)$/)
    let query = {}
    if (search) {
      query = search[0].replace(/^\?/, '').split('&').reduce((res, item) => {
        const split = item.split('=')
        res[split[0]] = split[1]
        return res
      }, {})
    }
    return Object.assign({}, query, extendQuery)
  }

  getQueryString (query) {
    const result = Object.keys(query).reduce((result, arg) => {
      const value = query[arg]
      if (value) {
        result.push(`${arg}=${value}`)
      }
      return result
    }, []).join('&')
    return result ? '?' + result : ''
  }
}
