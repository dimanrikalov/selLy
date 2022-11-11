const User = require('../models/User');


exports.getById = (userId) => User.findOne({_id: userId});

exports.updateById = (userId, data) => User.findOneAndUpdate(userId, data);