const router = require('express').Router();
const userService = require('../services/userService');
const listingService = require('../services/listingService');

router.post('/', async (req, res) => {
    const listing = await listingService.getById(req.body.listingId);
    if (req.body.userId === listing.userId.toString()) {
        return res
            .status(401)
            .json({ message: 'You cannot save your own listing!' });
    }

    const user = await userService.getById(req.body.userId);
    const isAlreadySaved = user.savedListings.some(
        (x) => x._id.toString() === listing._id.toString()
    );
    
    if (isAlreadySaved) {
        user.savedListings = user.savedListings.filter(
            (x) => x._id.toString() !== listing._id.toString()
        );
        await userService.updateById(user._id, user);
        return res.json({
            message: 'Listing removed from saved listings successfully!',
        });
    }

    user.savedListings.push(listing._id);
    await userService.updateById(user._id, user);
    return res.json({
        message: 'Listing added to saved listings successfully!',
    });
});

module.exports = router;
