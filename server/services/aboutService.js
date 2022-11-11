const User = require('../models/User');
const Listing = require('../models/Listing');
const Comment = require('../models/Comment');


exports.getStats = async () => {
    const userCount = await User.countDocuments();
    const listingCount = await Listing.countDocuments();
    const commentCount = await Comment.countDocuments();

    return {
        userCount,
        listingCount,
        commentCount
    }
}
