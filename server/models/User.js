const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function () {
                const regex = new RegExp('.+@[a-z]+.[a-z]+');
                return regex.test(this.email);
            },
        },
        message: 'Enter a valid email! Example: "someone@smth.smth".',
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at least 4 characters long!'],
    },
    name: {
        type: String,
        required: [true, 'Both first and last name required!'],
        validate: {
            validator: function () {
                const regex = new RegExp('[A-Z][a-z]+ [A-Z][a-z]+');
                return regex.test(this.name);
            },
        },
    },
    profileImage: {
        type: String,
        required: [true, 'Profile image is required!'],
        validate: {
            validator: function () {
                return (
                    this.profileImage.startsWith('http://') ||
                    this.profileImage.startsWith('https://')
                );
            },
            message: 'Enter a valid URL link!',
        },
    },
    country: {
        type: String,
        required: [true, 'Enter a valid country name is required!'],
        validate: {
            validator: function () {
                const regex = new RegExp('^[A-Z][a-z]+$');
                return regex.test(this.country);
            },
            message: 'Invalid country format!  Example: "Bulgaria".',
        },
    },
    city: {
        type: String,
        required: [true, 'Enter a valid city name is required!'],
        validate: {
            validator: function () {
                const regex = new RegExp('^[A-Z][a-z]+$');
                return regex.test(this.city);
            },
            message: 'Invalid city format! Example: "Plovdiv".',
        },
    },
    age: {
        type: Number,
        required: [true, 'Enter a valid age!'],
        min: [10, 'Age must be in range: [10 - 100].'],
        max: [100, 'Age must be in range: [10 - 100].'],
    },
    gender: {
        type: String,
        required: [true, 'Valid gender is required!'],
        enum: {
            values: ['male', 'female'],
            message: 'Enter a valid gender! (Male or Female)',
        },
    },
    listings: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Listing',
        },
    ],
    savedListings: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Listing',
        },
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS).then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
