const path = require('path');

module.exports = {
	reactScriptsVersion: 'react-scripts',
	style: {
		sass: {
			loaderOptions: {
				sassOptions: {
					includePaths: ['node_modules', 'src/assets'],
				},
			},
		},
		postcss: {
			// eslint-disable-next-line global-require
			plugins: [require('postcss-rtl')()],
		},
	},
	webpack: {
		alias: {
			'@styles': path.resolve(__dirname, 'src/@core/scss'),
		},
	},
};
