Shuttler.Scripts._types['jsx'] = function(userId, doc) {
	try {
		var options = Babel.getDefaultOptions();
		options.presets.push('react');
		var script = Babel.compile(doc.source, options);
		this.update(doc._id, { $set: { script: script.code }});
	} catch(error) {
		this.update(doc._id, { $set: { error: {
			line: error.loc.line,
			column: error.loc.column,
			message: error.message,
			name: error.name
		} } });
	}
};