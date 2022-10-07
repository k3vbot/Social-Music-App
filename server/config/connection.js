const mongoose = require('mongoose');
// production database
// mongodb://127.0.0.1:27017/Social-Music-App-Database

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Social-Music-App-Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



module.exports = mongoose.connection;