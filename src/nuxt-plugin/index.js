import { ImaginePlugin } from './class.js'

export default ({ app }, inject) => {
  const isDev = app.context.isDev
  const options = JSON.parse(`<%= JSON.stringify(options).replace(/^"/, "'").replace(/"$/, "'") %>`)
  inject('imgine', new ImaginePlugin(options, isDev))
}
