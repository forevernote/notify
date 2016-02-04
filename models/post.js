const mongoose = require('mongoose');

// Set geocoderProvider Options
const geocodeOptions = {
  geocoderProvider: 'google',
  httpAdapter: 'http',
  extra: {
    // apiKey: 'YOUR_API_KEY',
    formatter: 'gpx'
  }
};

// Create geocoder
const geocoder = require('node-geocoder')(geocodeOptions.geocoderProvider,
  geocodeOptions.httpAdapter, geocodeOptions.extra);


const postSchema = mongoose.Schema({
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
  }
});


module.exports = exports = mongoose.model('Post', postSchema);
