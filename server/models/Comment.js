const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment content is mandatory!']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'You must be logged in to be able to comment!'],
        ref: 'User'
    },
    isEdited: {
        type: Boolean,
        default: false,
        required: [true, 'Comment must have isEdited property!']
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;