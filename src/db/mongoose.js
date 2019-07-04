const mcu = require('./passwords');

const mongoose = require('mongoose');

mongoose.connect(mcu,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    });


