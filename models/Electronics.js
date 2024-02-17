const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [10, 'name should be atleast 10 character long'],
    },
    type: {
        type: String,
        required: [true, 'type is required'],
        minLength: [2, 'type should be atleast 2 character long'],
    },
    damages: {
        type: String,
        required: [true, 'damages is required'],
        minLength: [10, 'damages should be atleast 10 character long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: /^https?:\/\//
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        min: [10, 'description should be between 10 and 200 characters'],
        max: [200, 'description should be between 10 and 200 characters'],
    },
    production: {
        type: Number,
        required: [true, 'production is required'],
        min: [1900, 'description should be between 1900 and 2023 characters'],
        max: [2023, 'description should be between 1900 and 2023 characters'],
    },
    exploitation: {
        type: Number,
        required: [true, 'exploitation is required'],
        min: [0, 'exploitation should be a positive number'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'exploitation should be a positive number'],
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;