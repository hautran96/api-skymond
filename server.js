const express = require('express')
const app = express();

app.get('/', function (req, res) {

    const results = {
        Message: "hello cac ban ne"
    }

    return res.json(results)
})

app.listen(process.env.PORT, function () {
    console.log('server start success',)
})