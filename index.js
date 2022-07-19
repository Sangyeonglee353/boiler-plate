const express = require('express')
const app = express()
const port = 5000

/* 서버 연결 */
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

/* Mongo DB 연결 */
const mongoose = require('mongoose');
const { User } = require('./User');

// Mongo DB URI 보호를 위해 분할
const config = require('./config/key');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~안녕하신가요??'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/register', (req, res) => {

    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.

    // html에서 정보 읽어오기
    const user = new User(req.body)

    // mongo DB에 데이터 전달
    user.save((err, doc) => {
        // 실패시 json형태로 에러 메시지 전달
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            sucess:true
        })
    })
})