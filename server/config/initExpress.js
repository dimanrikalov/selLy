const cors = require('cors');
const express = require('express');
const router = require('../router');
const { LOCAL_PORT, LOCAL_SITE_URL } = require('../constants');

module.exports = () => {
    const app = express();

    app.use(express.json());

    app.use(
        cors({
            allowedHeaders: [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Headers',
                'Content-Type',
            ],
            origin: [LOCAL_SITE_URL],
            credentials: true,
        })
    );
    
    app.use(router);

    app.listen(LOCAL_PORT, () => console.log(`Server is listening on port ${LOCAL_PORT}...`));
};
