const router = require('express').Router();
const api = require('../services/listingService');
const userService = require('../services/userService');
const commentService = require('../services/commentService');
const isCommentAuthor = require('../middlewares/isCommentAuthor');

router.post('/create', async (req, res) => {
    const listing = await api.getByIdDetailed(req.body.listingId);
    if (!listing) {
        return res.status(404).json({ errorMessage: 'Listing not found!' });
    }

    try {
        const user = await userService.getById(req.body.userId);
        const comment = await commentService.createComment({
            content: req.body.content,
            userId: req.body.userId,
        });

        listing.comments.push(comment._id);
        user.comments.push(comment._id);

        await userService.updateById(user._id, user);
        await api.updateById(listing._id, listing);

        const updatedListing = await api.getByIdDetailed(req.body.listingId);

        return res.json({ message: 'Comment added!', listing: updatedListing });
    } catch (err) {
        return res.status(400).json({
            errorMessage: 'Server internal error! Try again later!',
        });
    }
});

router.post('/:commentId', async (req, res) => {
    try {
        const comment = await commentService.getById(req.body.commentId);
        return res.json(comment);
    } catch (err) {
        return res.status(400).json({ message: 'Comment not found!' });
    }
});

router.post('/:commentId/edit', isCommentAuthor, async (req, res) => {
    const listing = await api.getByIdDetailed(req.body.listingId);
    if (!listing) {
        return res.status(404).json({ errorMessage: 'Listing not found!' });
    }

    const comment = await commentService.getById(req.body.commentId);
    if (!comment) {
        return res.status(404).json({ errorMessage: 'Comment not found!' });
    }

    try {
        comment.content = req.body.newContent;
        comment.isEdited = true;
        await commentService.editComment(comment._id, comment);

        const updatedListing = await api.getByIdDetailed(listing._id);

        res.json({
            message: 'Comment edited successfully!',
            listing: updatedListing,
        });
    } catch (err) {
        return res.json(400, { errorMessage: 'Could not edit comment!' });
    }
});

router.post('/:commentId/delete', isCommentAuthor, async (req, res) => {
    const listing = await api.getByIdDetailed(req.body.listingId);
    if (!listing) {
        return res.status(404).json({ errorMessage: 'Listing not found!' });
    }

    const comment = await commentService.getById(req.params.commentId);
    if (!comment) {
        return res.status(404).json({ errorMessage: 'Comment not found!' });
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

        const updatedListing = await api.getByIdDetailed(listing._id);

        return res.json({
            message: 'Comment deleted successfully!',
            listing: updatedListing,
        });
    } catch (err) {
        return res.json(400, { errorMessage: 'Could not delete comment!' });
    }
});

module.exports = router;
