const mongoose = require('mongoose');

module.exports = () => {
    const schema = mongoose.Schema({
        source: String,
        guid: { type: String, index: { unique: true } },
        content: Object,
    });

    return mongoose.model('Feed', schema);
}