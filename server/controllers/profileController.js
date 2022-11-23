const router = require('express').Router();
const userService = require('../services/userService');

router.post('/', async (req, res) => {
    const user = await userService.getByIdDetailed(req.body.userId);
    if (user) {
        return res.json(user);
    }

    return res.status(400).json({ errorMessage: 'User not found!' });
});

router.post('/saved-listings', async (req, res) => {
    const user = await userService.getUserWithSavedListings(req.body.userId);
    if (user) {
        return res.json(user.savedListings);
    }

    return res.status(400).json({ errorMessage: 'User not found! ' });
});

module.exports = router;
