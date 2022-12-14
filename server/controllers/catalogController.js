const router = require('express').Router();
const api = require('../services/listingService');
const isLogged = require('../middlewares/isLogged');
const isSeller = require('../middlewares/isSeller');
const userService = require('../services/userService');
const commentsController = require('./commentsController');
const commentService = require('../services/commentService');
const saveListingController = require('../controllers/saveListingController');
const passListingIdMiddleware = require('../middlewares/passListingIdMiddleware');

router.get('/', async (req, res) => {
    try {
        const listings = await api.getAll();
        res.json(listings);
    } catch (err) {
        res.status(400).json({
            errorMessage: 'Server internal error! Try again later!',
        });
    }
});

router.post('/create', isLogged, async (req, res) => {
    const { item } = req.body;
    const isTaken = await api.getByTitle(item);

    if (isTaken) {
        return res
            .status(400)
            .json({ errorMessage: 'Listing with such title already exists' });
    }

    const payload = {
        item: req.body.item.trim(),
        brand: req.body.brand.trim(),
        imageUrl: req.body.imageUrl.trim(),
        description: req.body.description.trim(),
        location: `${req.body.city.trim()}, ${req.body.country.trim()}`,
        price: Number(req.body.price),
        userId: req.body.userId,
    };

    try {
        const listing = await api.createOne(payload);
        const user = await userService.getById(req.body.userId);
        user.listings.push(listing._id);
        await userService.updateById(user._id, user);
        res.json({ message: 'Listing added successfully!' });
    } catch (err) {
        res.status(400).json({
            errorMessage: 'Server internal error! Try again later!',
        });
    }
});

router.get('/:listingId/details', async (req, res) => {
    const listing = await api.getByIdDetailed(req.params.listingId);
    if (listing) {
        return res.json(listing);
    }
    res.status(404).json({
        errorMessage: 'Listing not found!',
    });
});

router.post('/:listingId/edit', isLogged, isSeller, async (req, res) => {
    const listing = await api.getById(req.params.listingId);
    if (!listing) {
        return res.status(404).json({
            errorMessage: 'Listing not found!',
        });
    }

    const payload = {
        item: req.body.item,
        brand: req.body.brand,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        location: `${req.body.city}, ${req.body.country}`,
        price: Number(req.body.price),
        userId: req.body.userId,
    };

    try {
        const allListings = await api.getAll();
        const filteredListings = allListings.filter(
            (x) => x._id.toString() != listing._id.toString()
        );

        const itemNameIsTaken = filteredListings.some(
            (x) => x.name === payload.item
        );

        if (itemNameIsTaken) {
            return res.status(400).json({
                errorMessage: 'Listing with this name already exists',
            });
        }

        await api.updateById(req.params.listingId, payload);
        res.json({ message: 'Listing successfully updated!' });
    } catch (err) {
        return res.status(400).json({
            message: 'Server internal error! Try again later!',
        });
    }
});

router.post('/:listingId/delete', isLogged, isSeller, async (req, res) => {
    try {
        const listing = await api.getByIdDetailed(req.params.listingId);
        await Promise.all(
            listing.comments.map(async (x) => {
                const commentAuthor = await userService.getById(x.userId._id);
                commentAuthor.comments = commentAuthor.comments.filter(
                    (y) => y._id.toString() !== y._id.toString()
                );
                await userService.updateById(commentAuthor._id, commentAuthor);
                await commentService.deleteComment(x._id);
            })
        );

        const user = await userService.getById(req.body.userId);
        user.listings = user.listings.filter((x) => x != req.params.listingId);
        await userService.updateById(user._id, user);
        await api.deleteById(req.params.listingId);

        return res.json({ message: 'Listing deleted successfully!' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            errorMessage: 'Server internal error! Try again later!',
        });
    }
});

router.use(
    '/:listingId/comments',
    isLogged,
    passListingIdMiddleware,
    commentsController
);

router.use(
    '/:listingId/save',
    isLogged,
    passListingIdMiddleware,
    saveListingController
);

module.exports = router;
