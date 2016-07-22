module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/helper.js',
      'test/**/*.test.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['browserify']
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    customLaunchers: {
      chromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  })

  if (process.env.TRAVIS) {
    config.browsers = ['chromeTravisCi']
  }
}
