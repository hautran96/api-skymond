const express = require('express')
const app = express();

app.get('/', function (req, res) {

    const results = {
        Message: "hello cac ban"
    }

    return res.json(results)
})

app.listen(3000, function () {
    console.log('server start success',)
})