const { Schema } = require('mongoose');

const albumSchema = new Schema({
  artist: {
      type: String,
  },
  albumName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = albumSchema;