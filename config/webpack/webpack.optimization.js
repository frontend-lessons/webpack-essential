module.exports = { 
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks:{
        hidePathInfo: true,
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 109,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {} 
    },
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
    minimizer: [ ],
    nodeEnv: 'production' 
}