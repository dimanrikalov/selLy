const router = require('express').Router();
const userService = require('../services/userService');

router.post('/', async (req, res) => {
    try {
        const user = await userService.getByIdDetailed(req.body.userId);
        return res.json(user);
    } catch (err) {
        return res
            .status(400)
            .json({ errorMessage: 'Internal server error! Try again later!' });
    }
});

router.post('/saved-listings', async (req, res) => {
    try {
        const user = await userService.getUserWithSavedListings(
            req.body.userId
        );
        return res.json(user.savedListings);
    } catch (err) {
        return res
            .status(400)
            .json({ errorMessage: 'Internal server error! Try again later!' });
    }
});

module.exports = router;
