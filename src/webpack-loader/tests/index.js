const build = require('./builder');
const expect = require('chai').expect;



describe('#webpack-loader', async function () {
  // require('./resources/img1.png?{map:[744, 1488, 2233]}');
  // const test1 = await build('test1.js').catch(console.log)
  
  // require('./resources/img1.png?{map:[744, 1488, 2233]}');
  // const test2 = await build('test2.js').catch(console.log)
  
  // require('./resources/img1.png?{map:[744, 1488, 2233]}');
  const test3 = await build('test3.js').catch(console.log)
  
  console.log('test3', test3, test3.result)
  // console.log('test2', test2)
  
  // it('Dev format', function () {
  //   expect(pluginDev.format('/test/img.jpg')).to.equal('/imgine.space/test/img.jpg')
  //   expect(pluginDev.format('/test/img.jpg', { w: 100 })).to.equal('/imgine.space/test/img.jpg?w=100')
  //   expect(pluginDev.format('/test/img.jpg?w=10', { w: 100 })).to.equal('/imgine.space/test/img.jpg?w=100')
  //   expect(pluginDev.format('/test/img.jpg?w=10', { f: 'avif' })).to.equal('/imgine.space/test/img.jpg?w=10&f=avif')
  // })
});
