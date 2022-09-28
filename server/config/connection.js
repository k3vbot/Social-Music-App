const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || '', { //TODO add mongodb connection
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});

module.exports = mongoose.connection;