const mongoose = require('mongoose')
const config = require('../../config/env')
const db = mongoose.createConnection(config.db);

var defaultSchema = new mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now()
    },
    create_by: {
        type: String,
        default: ""
    },
    update_date: {
        type: Date,
        default: Date.now()
    },
    update_by: {
        type: String,
        default: ""
    },
    is_delete: {
        type: Number,
        default: 0
    }
});

module.exports = defaultSchema;