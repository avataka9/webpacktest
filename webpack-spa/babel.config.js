module.exports = (api) => {
	api.cache(true);
	
	return {
		inputSourceMap: true,
		sourceMaps: 'both',
		presets: [
			require("@babel/preset-env"),
		],
		plugins: [],
	}
};