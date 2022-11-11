const router = require('express').Router();
const api = require('../services/listingService');
const userService = require('../services/userService');
const commentService = require('../services/commentService');
const isCommentAuthor = require('../middlewares/isCommentAuthor');

router.post('/create', async (req, res) => {
    const listing = await api.getByIdDetailed(req.body.listingId);
    if (!listing) {
        return res
            .status(404)
            .json({ errorMessage: 'Listing does not exist!' });
    }

    try {
        const user = await userService.getById(req.body.userId);
        const comment = await commentService.createComment({
            content: req.body.content,
            author: req.body.userId,
        });

        listing.comments.push(comment._id);
        user.comments.push(comment._id);

        await userService.updateById(user._id, user);
        await api.updateById(listing._id, listing);
        return res.json({ message: 'Comment added!' });
    } catch (err) {
        return res.json({
            errorMessage: 'Server error: Could not add comment!',
        });
    }
});

router.post('/:commentId/edit', isCommentAuthor, async (req, res) => {
    const listing = await api.getById(req.body.listingId);
    if (!listing) {
        return res
            .status(404)
            .json({ errorMessage: 'Listing does not exist!' });
    }

    const comment = await commentService.getById(req.params.commentId);
    if (!comment) {
        return res
            .status(404)
            .json({ errorMessage: 'Comment does not exist!' });
    }

    try {
        comment.content = req.body.newContent;
        await commentService.editComment(comment._id, comment);

        res.json({ message: 'Comment edited successfully!' });
    } catch (err) {
        return res.json(400, { errorMessage: 'Could not edit comment!' });
    }
});

router.post('/:commentId/delete', isCommentAuthor, async (req, res) => {
    const listing = await api.getById(req.body.listingId);
    if (!listing) {
        return res
            .status(404)
            .json({ errorMessage: 'Listing does not exist!' });
    }

    const comment = await commentService.getById(req.params.commentId);
    if (!comment) {
        return res
            .status(404)
            .json({ errorMessage: 'Comment does not exist!' });
    }

    try {
        const user = await userService.getById(req.body.userId);

        user.comments = user.comments.filter(
            (x) => x._id.toString() !== comment._id.toString()
        );

        listing.comments = listing.comments.filter(
            (x) => x._id.toString() !== comment._id.toString()
        );

        await userService.updateById(user._id, user);
        await api.updateById(listing._id, listing);

        await commentService.deleteComment(comment._id);

        return res.json({ message: 'Comment deleted successfully!' });
    } catch (err) {
        return res.json(400, { errorMessage: 'Could not delete comment!' });
    }
});

module.exports = router;
