const commentService = require('../services/commentService');

module.exports = async (req, res, next) => {
    const comment = await commentService.getById(req.params.commentId);
    if (req.body.userId.toString() !== comment.userId.toString()) {
        return res.status(401).json({
            errorMessage: `You must be the comment's author in order to edit it!`,
        });
    }

    next();
};