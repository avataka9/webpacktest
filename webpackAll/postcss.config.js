module.exports = {
    parser: 'postcss-safe-parser',
    plugins: {
        'postcss-preset-env': {},
        //'postcss-import': {},
        'precss': {},
        'postcss-nested-ancestors': {},
        'postcss-nested': {},
        'autoprefixer': {},
        'cssnano': {}
    }
};