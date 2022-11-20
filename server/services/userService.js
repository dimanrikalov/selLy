const User = require('../models/User');

exports.getById = (userId) => User.findOne({ _id: userId });

exports.getByIdDetailed = (userId) =>
    User.findById(userId).populate('listings');

exports.updateById = (userId, data) => User.findOneAndUpdate(userId, data);

exports.getUserWithSavedListings = (userId) =>
    User.findById(userId).populate('savedListings');
