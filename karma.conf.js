// Karma configuration
// Generated on Sun Dec 24 2017 00:40:10 GMT+0900 (JST)
const path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'snapshot', 'mocha-snapshot', 'karma-typescript'],


    // list of files / patterns to load in the browser
    files: [
      '**/__snapshots__/**/*.md',
      'lib/**/*.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/__snapshots__/**/*.md': 'snapshot',
      '**/*.ts': 'karma-typescript',
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'karma-typescript'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    // karma-coverage
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    },
    // karma-snapshot
    snapshot: {
      update: !!process.env.UPDATE,
      prune: !!process.env.PRUNE,
      checkSourceFile: false,
      pathResolver,
    },
    // karma-mocha-reporter
    mochaReporter: {
      showDiff: true,
    },
    // karma-typescript
    karmaTypescriptConfig: {
      compilerOptions: {
        module: 'commonjs',
      },
      coverageOptions: {
        exclude: /__tests__/,
      },
      tsconfig: './tsconfig.json',
    },
  })
};

function pathResolver(basePath, suiteName){
  return path.join(basePath, "__snapshots__", suiteName + ".md");
}
