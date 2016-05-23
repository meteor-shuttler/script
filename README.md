# Scripts

[GitHub](https://github.com/meteor-shuttler/scripts) [Atmosphere.js](atmospherejs.com/shuttler/scripts)

Reactive compilable and executable scripts on client and server with mongodb.

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

Out of box types support:

* `js` Meteor Babel version of JavaScript
* `jsx` React.js version of Meteor Babel JavaScript

### Shuttler.Scripts.attachScripts
> ()

It will make any collection storage script.

### scriptsCollection.isScripts
> Boolean = true

Allows you to check the collection as scripts storage.

```js
var document = Shuttler.Scripts.findOne();
if (Shuttler.collection(document.Collection()).isScripts) {
	console.log('Is a script!');
}
```

### scriptDocument.isScript
> Boolean

Allows you to check the document as a script.

```js
var document = Shuttler.Scripts.findOne();
if (document.isScript) {
	console.log('Is a script!');
}
```

## Versions

### 0.0.3
* `jsx` type

### 0.0.1
* `isScript` and `isScripts`