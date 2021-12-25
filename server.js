const app = require('./config/express')
const mongoose = require('mongoose')
const config = require('./config/env');
Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect(config.db)

mongoose.connection.on('open', function () {
    console.log('Connected to mongodb database');
})

mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

const PORT = process.env.PORT || config.port

if (!module.parent) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`server started on port ${PORT} (${config.env})`);
    });
}