const mongoose = require('mongoose');
const { CONNECTION_URL } = require('../constants');

module.exports = async () => {
    mongoose.connection.on('open', () =>
        console.log(`Connected to database...`)
    );
    return mongoose.connect(CONNECTION_URL);
};
