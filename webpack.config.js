module.exports = () => ({ plugins:
   [],
  context:
   '/home/temple/www/frontend/webpack/webpack-essential',
  entry: './src',
  target: 'web',
  module:
   { unknownContextRequest: '.',
     unknownContextRecursive: true,
     unknownContextCritical: true,
     exprContextRequest: '.',
     exprContextRecursive: true,
     exprContextCritical: true,
     wrappedContextRegExp: /.*/,
     wrappedContextRecursive: true,
   },
  output:
   { filename: '[name].js',
     chunkFilename: '[name].js',
     webassemblyModuleFilename: '[modulehash].module.wasm',
     hotUpdateFunction: 'webpackHotUpdate',
     jsonpFunction: 'webpackJsonp',
     chunkCallbackName: 'webpackChunk',
     globalObject: 'window',
     libraryTarget: 'var',
     path:
      '/home/temple/www/frontend/webpack/webpack-essential/dist',
     sourceMapFilename: '[file].map[query]',
     hotUpdateChunkFilename: '[id].[hash].hot-update.js',
     hotUpdateMainFilename: '[hash].hot-update.json',
     chunkLoadTimeout: 120000,
     hashFunction: 'md4',
     hashDigest: 'hex',
     hashDigestLength: 20 },
  node:
   { process: true,
     global: true,
     Buffer: true,
     setImmediate: true,
     __filename: 'mock',
     __dirname: 'mock' },
  performance:
   { maxAssetSize: 250000,
     maxEntrypointSize: 250000,
     hints: 'warning' },
  optimization:
   { removeAvailableModules: true,
     removeEmptyChunks: true,
     mergeDuplicateChunks: true,
     flagIncludedChunks: true,
     occurrenceOrder: true,
     sideEffects: true,
     providedExports: true,
     usedExports: true,
     concatenateModules: true,
     splitChunks:
      { hidePathInfo: true,
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 109,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {} },
     noEmitOnErrors: true,
     checkWasmTypes: true,
     minimize: true,
     minimizer: [ ],
     nodeEnv: 'production' },
  resolve:
   { unsafeCache: true,
     modules: [ 'node_modules' ],
     extensions: [ '.wasm', '.mjs', '.js', '.json' ],
     mainFiles: [ 'index' ],
     aliasFields: [ 'browser' ],
     mainFields: [ 'browser', 'module', 'main' ] },
  resolveLoader:
   { unsafeCache: true,
     mainFields: [ 'loader', 'main' ],
     extensions: [ '.js', '.json' ],
     mainFiles: [ 'index' ] },
  infrastructureLogging: { level: 'info' } })
