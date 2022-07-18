const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const username = encodeURIComponent("leesy");
const password = encodeURIComponent("whitedeveloper!@20");

mongoose.connect(`mongodb+srv://${username}:${password}@testcluster.li2gdwu.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~안녕하신가요?'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
