const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const spawn = require('child_process').spawn;
const prefix = "./../";


module.exports = {
	entry: path.resolve(__dirname, prefix+"src/loader.tsx"),
	externals: {
		'react': 'react',
		'react-dom': 'react-dom',
	},
	output: {
		path: path.resolve(__dirname, prefix+"dist"),
		libraryTarget: 'umd',
		library: "argueview",
		globalObject: "this",
		umdNamedDefine: true
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js", ".css", "scss"],
	    modules: [
	    	path.resolve(__dirname, prefix+"src"),
	    	path.resolve(__dirname, prefix+"node_modules"),
	    ],
	    alias:{
	    	//sync with tsconfig
			"src": path.resolve(__dirname, prefix+"src/"),
			"package": path.resolve(__dirname, prefix+"package.json"),
	    	
	    	//modules
	    	"modules": path.resolve(__dirname, prefix+"node_modules"),
	    }
	},
	  
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {

				}
			}]
		}, {
			test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/,
			loader: 'url-loader'
		}]
	},
	  
	plugins: [
		{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
					const child = spawn('bash', [path.resolve(__dirname, 'postbuild.sh')], {
						cwd: path.resolve(__dirname, prefix)
					});
					child.on('exit', () => {
						console.log('Post-build steps completed.');
					});
					child.stdout.pipe(process.stdout);
					child.stderr.pipe(process.stderr);
				});
			}
		}
	]
};