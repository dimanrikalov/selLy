const api = require('../services/listingService');

module.exports = async (req, res, next) => {
    const listing = await api.getById(req.params.listingId);
    if (listing.userId.toString() !== req.body.userId) {
        return res
            .status(401)
            .json({ errorMessage: 'You must be the seller!' });
    }
    
    next();
};
