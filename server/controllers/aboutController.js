const router = require('express').Router();
const aboutApi = require('../services/aboutService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    try {
        const data = await aboutApi.getStats();
        const savedCount = await (await userService.getAll())
            .map((x) => x.savedListings.length)
            .reduce((a, x) => a + x, 0);
        res.json({ ...data, savedCount });
    } catch (err) {
        res.status(400).json({
            errorMmessage: 'Server internal error! Try again later!',
        });
    }
});

module.exports = router;
