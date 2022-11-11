const router = require('express').Router();
const aboutApi = require('../services/aboutService');

router.get('/', async (req, res) => {
    try {
        const data = await aboutApi.getStats();
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: 'Fetch error!' });
    }
});

module.exports = router;
