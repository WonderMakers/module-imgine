const build = require('./builder');
const {expect, should} = require('chai');



describe('#webpack-loader', function () {
  // it('Formats [default]', async () => {
  //   // require('./resources/img1.png?{map:[744, 1488, 2233]}');
  //   const res = await build('test2.js').catch(console.log)
  //   const res2 = await build('test1.js').catch(console.log)
  //
  //   console.log('test 1', res2)
  // })
  
  it('Formats [default]', async () => {
    // require('./resources/img1.png?{map:[744, 1488, 2233]}');
    const res = await build('test1.js').catch(console.log)
    
    const isPNG = !!res.result.formats.find(item => item.type === 'image/png')
    const isAVIF = !!res.result.formats.find(item => item.type === 'image/avif')
    const isWEBP = !!res.result.formats.find(item => item.type === 'image/webp')

    expect(isPNG).to.equal(true)
    expect(isAVIF).to.equal(true)
    expect(isWEBP).to.equal(true)
  })
  
  it('Sort', async () => {
    // require('./resources/img1.png?{map:[744, 1488, 2233]}');
    const res = await build('test1.js').catch(console.log)
    
    const sortFormats = res.result.formats.map(item => item.type).join(',')
    const sortMap = res.result.formats[0].srcset
    
    expect(sortMap).to.equal('/image744.avif 744w,/image1488.avif 1488w,/image2233.avif 2233w')
    expect(sortFormats).to.equal('image/avif,image/webp,image/png')
  })
});
