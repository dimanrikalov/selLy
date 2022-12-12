exports.LOCAL_PORT = 3000;
exports.SALT_ROUNDS = 10;
const DATABASE_NAME = 'SelLy';
exports.CONNECTION_LOCAL_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
exports.PORT = process.env.PORT;
exports.CONNECTION_URL =
    'mongodb+srv://dimanrikalov:corn1corn@cluster-diman-rikalov.ijsbued.mongodb.net/selLy?retryWrites=true&w=majority';
exports.SITE_URL = 'https://sel-ly.web.app';
exports.LOCAL_SITE_URL = 'http://localhost:4200'