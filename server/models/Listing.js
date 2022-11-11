const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Item name is mandatory'],
        minLength: [2, 'Item name must be at least 2 characters long.'],
        validate: {
            validator: function () {
                const regex = new RegExp('[A-Z][a-z]+');
                return regex.test(this.item);
            },
            message: 'Listing name must start with a capital letter!',
        }
    },
    brand: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: [true, 'A valid image URL is mandatory!'],
        validate: {
            validator: function () {
                return (
                    this.imageUrl.startsWith('http://') ||
                    this.imageUrl.startsWith('https://')
                );
            },
            message: 'Image URL must start with https:// or http://',
        },
    },
    description: {
        type: String,
        required: [true, 'Listing description is mandatory!'],
        minLength: [
            15,
            'Listing description must be at least 15 characters long.',
        ],
    },
    location: {
        type: String,
        required: [true, 'Listing location is mandatory!'],
        validate: {
            validator: function () {
                const regex = new RegExp('[A-Z][a-z]+, [A-Z][a-z]');
                return regex.test(this.location);
            },
            message: 'Invalid location! Valid format: "City, Country".',
        },
    },
    price: {
        type: Number,
        required: ['Price for item is mandatory!'],
        min: [0, 'Price cannot be negative!'],
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
