const { Schema } = require('mongoose');

const albumSchema = new Schema({
  AlbumName: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = albumSchema;