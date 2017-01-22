# yummly-api
Yummly API which uses the visitor API, so it's API-Key independent

# Installation
```
npm install yummly-api
```

# Example
```js
var Yummly = require('./yummly.js');
var yummly = new Yummly();

yummly.setSearch('burger');
yummly.getRecipes(function(callback) {
    console.log(callback);
});
```
