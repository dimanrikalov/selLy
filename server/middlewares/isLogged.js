module.exports = (req, res, next) => {
    if(!req.body.userId) {
        return res.status(401).json({errorMessage: 'You must be logged in!'});
    }
    
    next();
}