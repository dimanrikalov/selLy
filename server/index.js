const initExpress = require('./config/initExpress');
const initDatabase = require('./config/initDatabase');

(async function initServer() {
    await initDatabase();
    initExpress();
})();
