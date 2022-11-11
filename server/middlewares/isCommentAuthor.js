const commentService = require('../services/commentService');

module.exports = async (req, res, next) => {
    const comment = await commentService.getById(req.body.userId);
    if (req.body.userId.toString() !== comment.author.toString()) {
        return res.status(404).json({
            errorMessage: `You must be the comment's author in order to edit it!`,
        });
    }
    
    next();
}