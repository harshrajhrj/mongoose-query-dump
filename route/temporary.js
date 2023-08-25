const mongoose = require('mongoose');

const PlatformDocument = new mongoose.Schema({
    platform: {
        type: String,
        enum: {
            values: ['YouTube', 'Twitch', 'Twitter', 'Facebook', 'Restream', 'LinkedIn', 'Instagram', 'Tik Tok'],
            message: '{VALUE} is an invalid platform.'
        },
        default: 'YouTube'
    },
    url: {
        type: String,
        default: null
    }
});

const StreamerSchema = new mongoose.Schema({
    channelName: {
        type: String,
        default: null
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        default: null
    },
    /**
     * streamer logo
     */
    logo: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    /**
     * streamer thumbnail
     */
    thumbnail: [{
        type: mongoose.SchemaTypes.ObjectId,
        default: null
    }],
    /**
     * streamer profile picture
     */
    picture: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null
    },
    claimedAccounts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Player',
        required: true
    }],
    platforms: [PlatformDocument]
}, { collection: 'streamer', timestamps: true });

module.exports = mongoose.model('Streamer', StreamerSchema);