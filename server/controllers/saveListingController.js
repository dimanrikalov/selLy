const userService = require('../services/userService');
const listingService = require('../services/listingService');
const router = require('express').Router();

router.post('/', async (req, res) => {


    const listing = await listingService.getById(req.body.listingId);
    if (req.body.userId === listing.userId.toString()) {
        return res
            .status(401)
            .json({ message: 'You cannot save your own listing!' });
    }

    const user = await userService.getById(req.body.userId);
    const isAlreadySaved = user.savedListings.some(
        (x) => x._id.toString() === req.body.listingId
    );

    if (isAlreadySaved) {
        user.savedListings = user.savedListings.filter(
            (x) => x._id.toString() !== req.body.listingId
        );
        await userService.updateById(user._id);
        return res.json({
            message: 'Listing removed from saved listings successfully!',
        });
    }

    user.savedListings.push(req.body.listingId);
    await userService.updateById(user._id);
    return res.json({
        message: 'Listing added to saved listings successfully!',
    });
});

module.exports = router;
