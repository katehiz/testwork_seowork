/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
	// devServer: {
	// 	proxy: 'http://localhost:8080'
	// },
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: '',
	indexPath: 'index.html',
	filenameHashing: true,
	pages: {
		index: {
		  entry: 'src/main.js',
		  template: 'public/index.html',
		  filename: 'index.html',
		  title: 'Index Page',
		  chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
	  }
}