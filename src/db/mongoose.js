const {mongoConnectionUri} = require('./passwords');

const mongoose = require('mongoose');

mongoose.connect(mongoConnectionUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });


