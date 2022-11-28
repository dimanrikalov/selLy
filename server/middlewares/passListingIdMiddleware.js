module.exports = (req, res, next) => {
    req.body = { ...req.body, listingId: req.params.listingId };

    next();
};
