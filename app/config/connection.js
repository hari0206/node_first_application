const mongoose = require('mongoose');
const config = require('./configs');

mongoose.connect(
    `mongodb://localhost:27017/${config.dbName}`,
    { useNewUrlParser: true },
    (err) => {
        if (err) console.log('Error Conncting To Mongo-----', err);
        else console.log(`Connected to ${config.dbName}!!!`);
    }
);