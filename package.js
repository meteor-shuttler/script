Package.describe({
	name: 'shuttler:scripts',
	version: '0.0.3',
	summary: 'Reactive compilable and executable scripts on client and server with mongodb.',
	git: 'https://github.com/meteor-shuttler/scripts',
	documentation: 'README.md'
});

Npm.depends({
	"babel-preset-react": "6.5.0"
});

Package.onUse(function(api) {
	
	api.versionsFrom('1.2.1');
	
	api.use('ecmascript');
	
	api.use('babel-compiler@6.5.1');
	api.use('shuttler:namespace@0.0.5');
	api.use('aldeed:collection2@2.9.0');
	api.use('dburles:collection-helpers@1.0.4');
	api.use('matb33:collection-hooks@0.8.1');
	
	api.addFiles('scripts.js');
	
	api.addFiles('types/js.js');
	api.addFiles('types/jsx.js');
	
	api.export('Shuttler');
});