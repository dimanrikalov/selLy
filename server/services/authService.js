const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.findByEmail = (email) => User.findOne({ email });

exports.registerUser = (userData) => User.create(userData);

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }

    return user;
};
