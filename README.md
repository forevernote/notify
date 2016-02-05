# Notify
The first project assignment for Code Fellows Seattle Full-Stack JavaScript 401, February 2016.
Notify was inspired by the Evernote application but has a more minimalist design, targeted to different user needs.

Notify is a two-resource REST Node.js app using the Express framework connected to a Modulus database using Mongoose. Bootstrap and Angular are used on the frontend.

## Contents
+   [API](https://github.com/forevernote/notify#api)
+   [Dependencies](https://github.com/forevernote/notify#dependencies)
+   [Authors](https://github.com/forevernote/notify#authors)
+   [License](https://github.com/forevernote/notify#license)


## API
User Schema

```js
name: {
  first: String,
  last: String
},
birthday: Date,
gender: String,
geoTag: String,
social: String,
hint: String,
authentication: {
  email: String,
  password: String
}
```
Post Schema

```js

  }
  title: String,
  createdOn: Date,
  author_id: String,
  expires: Date,
  content: {
    text: String,
    images: Array,
    date: Date,
    tags: Array,
  },
  location: {
    title: String,
    address: String,
    coords: {
      lat: Number,
      lng: Number
    }
  ```

## Dependencies

```
"dependencies": {
  "bcrypt": "^0.8.5",
  "body-parser": "^1.14.2",
  "express": "^4.13.4",
  "jsonwebtoken": "^5.5.4",
  "mongoose": "^4.3.7",
  "node-geocoder": "^3.6.2"
},
"devDependencies": {
  "chai": "^3.5.0",
  "chai-http": "^1.0.0",
  "gulp": "^3.9.0",
  "gulp-eslint": "^1.1.1",
  "gulp-sass": "^2.1.1",
  "mocha": "^2.4.5",
  "nodemon": "^1.8.1"
}
```

## Authors

This app was written by [Sam Heutmaker](https://github.com/samheutmaker), [Chris Lee](https://github.com/clee46), [Ardian Ajvazi](https://github.com/ardianajvazi), [Rob Merrill](https://github.com/robgmerrill), and [Erika Hokanson](https://github.com/erikawho) as coursework for JavaScript 401 at Code Fellows.

## License

This project is licensed under the terms of the MIT license.
