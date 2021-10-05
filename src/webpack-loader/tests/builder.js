const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const { createFsFromVolume, Volume } = require('memfs');

module.exports = async function build (entry) {
  const memoryFs = createFsFromVolume(new Volume())
  const config = webpackConfig(entry);
  const compiler = webpack(config);
  const dist = './src/webpack-loader/tests/dist';
  compiler.outputFileSystem = memoryFs;
  
  return await compileAsync(compiler).then(() => {
    const compiledDist = compiler.outputFileSystem.readdirSync(dist, 'utf8');
    const compiledCode = compiler.outputFileSystem.readFileSync(dist + '/' + entry, 'utf8');
    eval(compiledCode)
    return {
      dist: compiledDist,
      result: __RESULT__
    }
  })
  
  function compileAsync(compiler) {
    return new Promise((resolve, reject) => {
      compiler.run((error, stats) => {
        if (error || stats.hasErrors()) {
          // console.log(error, stats.toJson('errors-only'))
          const resolvedError = error || stats.toJson('errors-only').errors[0]
          reject(resolvedError.message)
        }
        resolve(stats)
      })
    })
  }
}

