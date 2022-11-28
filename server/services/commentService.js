const Comment = require('../models/Comment');

exports.createComment = (commentData) => Comment.create(commentData);

exports.deleteComment = (commentId) => Comment.findByIdAndDelete(commentId);

exports.getById = (commentId) => Comment.findById(commentId);

exports.editComment = (commentId, newData) =>
    Comment.findByIdAndUpdate(commentId, newData);
