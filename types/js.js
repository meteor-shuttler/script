Shuttler.Scripts._types['js'] = function(userId, doc) {
	try {
		var script = Babel.compile(doc.source);
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