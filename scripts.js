Shuttler.Scripts = new Mongo.Collection('shuttler:scripts');

Shuttler.Scripts.Schema = new SimpleSchema({
	source: {
		type: String
	},
	script: {
		type: String,
		optional: true
	},
	type: {
		type: String
	},
	error: {
		type: new SimpleSchema({
			name: { type: String },
			message: { type: String },
			line: { type: Number },
			column: { type: Number }
		}),
		optional: true
	}
});
Shuttler.Scripts.attachScripts = function() {
	var collection = this;
	
	this.attachSchema(Shuttler.Scripts.Schema);
	
	if (Meteor.isServer) {
		this.after.insert(function(userId, doc) {
			Shuttler.Scripts._types[doc.type].apply(collection, arguments);
		});
		this.after.update(function(userId, doc) {
			if (this.previous.source != doc.source || this.previous.type != doc.type)
				Shuttler.Scripts._types[doc.type].apply(collection, arguments);
		});
	}
};

Shuttler.Scripts.attachScripts(Shuttler.Scripts);

Shuttler.Scripts._types = {};