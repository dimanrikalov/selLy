const api = require('../services/listingService');

module.exports = async (req, res, next) => {
    const listing = await api.getById(req.params.listingId);
    if (listing.seller.toString() !== req.body.userId.toString()) {
        return res
            .status(404)
            .json({ errorMessage: 'You must be the seller!' });
    }
    
    next();
};
