const mongoose = require('mongoose')
const config = require('../../config/env')
const db = mongoose.createConnection(config.db);
const defaultSchema = require('./defaut.schema')

const accountSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    pass_word: {
        type: String,
        unique: true,
        required: true
    },
    ...defaultSchema.obj,
}, { strict: false })

const accounts = db.model('skymond-accounts', accountSchema)

module.exports = accounts;