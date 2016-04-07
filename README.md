# Scripts

[Examples](http://meteor-shuttler.herokuapp.com/scripts) [GitHub](https://github.com/meteor-shuttler/scripts) [Atmosphere.js](atmospherejs.com/shuttler/scripts)

Reactive executable client scripts from mongodb.

## Install

```
meteor add shuttler:scripts
```

## Theory

### Two-step compilation

1. Update `source` value
2. Server observe `changed` compile `source` into `script`

If the compilation was an error, information about it will be in the `error` field.

## Example

```js
if (Meteor.isClient) {
	Shuttler.Scripts.observe({
		changed(newDocument, oldDocument) {
			console.log(newDocument);
			(function(abc){
				eval(newDocument.script);
			})({ cde: 123 });
			
		}
	});
	Shuttler.Scripts.insert({ source: '(()=>{console.log(abc)})()', type: 'js' });
}
// After time:
// {"_id":"iyAsxHdZ5Skmqo5BA","source":"(()=>{console.log(abc)})()","type":"js","script":"(function () {↵  console.log(abc);↵})();"}
// { cde: 123 }
```

## Documentation

### Shuttler.Scripts.Schema
> SimpleSchema

### Shuttler.Scripts._types
> { type: Function.call(collection, userId, doc, fieldNames?, modifier?, options?) }

Here you can add your own types for compilation.