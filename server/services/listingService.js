const Listing = require('../models/Listing');

exports.getAll = () => Listing.find();

exports.getById = (listingId) => Listing.findOne({ _id: listingId });

exports.getByTitle = (item) => Listing.findOne({ item });

exports.getByIdDetailed = (listingId) =>
    Listing.findById(listingId).populate('comments');

exports.createOne = (listing) => Listing.create(listing);

exports.deleteById = (listingId) =>
    Listing.findByIdAndDelete(listingId);

exports.updateById = (listingId, listing) => Listing.findByIdAndUpdate(listingId, listing);