# Notify
Group project assignment for Code Fellows Seattle JavaScript 401.
This is a REST app using the server-side HTTP framework Koa in combination with MongoDB. Modulus Mongolabs.

## Contents
+   [Compare/Contrast](https://github.com/koacoffee/coffee#comparecontrast)
+   [API](https://github.com/koacoffee/coffee#api)
+   [Dependencies](https://github.com/koacoffee/coffee#dependencies)
+   [Authors](https://github.com/koacoffee/coffee#authors)
+   [License](https://github.com/koacoffee/coffee#license)

## Compare/Contrast Koa with Express
Koa is known as being a lightweight framework created by the Express team, for Node.js, running on V8.
- For both, you ```require``` the framework and use ```app.listen``` on the server.
- Koa uses ES6 generators and ```yield next()```
- Koa uses ```this.request``` and ```this.response``` while Express uses ```(req,res)```
- Koa does not have a built-in router, while Express does.
- Koa requires a separate middleware to handle routes.
- Koa does not use callbacks, while Express does.
- Koa has built-in error handling, while Express does not.
- Koa and Express both use the same method calls:
```
.get()
.put()
.post()
.delete()
```

There are pros and cons to Koa and Express. The freedom of choice is yours!


## API
REST model (/api/_____)
```
}
name: String,
flavor: String,
body: String,
fairTrade: Boolean,
cupPreference: {type: String, default: 'coffee cup'},
location: String
}
```

## Dependencies

```
"dependencies": {
  "glob": "^6.0.4",
  "koa": "^1.1.2",
  "koa-bodyparser": "^2.0.1",
  "koa-mongo": "^0.5.0",
  "koa-mongoose": "^1.0.9",
  "koa-router": "^5.3.0",
  "mongoose": "^4.3.7",
  "mongoose-q": "^0.1.0"
},
"devDependencies": {
  "chai": "^3.4.1",
  "chai-http": "^1.0.0",
  "gulp": "^3.9.0",
  "gulp-eslint": "^1.1.1",
  "gulp-mocha": "^2.2.0",
  "gulp-util": "^3.0.7",
  "mocha": "^2.3.4"
}
```

## Authors

This server/router was written by [Aaron Filson](https://github.com/AaronFilson) and
[Erika Hokanson](https://github.com/erikawho) as coursework for JavaScript 401 at Code Fellows.

## License

This project is licensed under the terms of the MIT license.
