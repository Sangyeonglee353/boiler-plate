const express = require('express')
const app = express()
const port = 5000

/* 서버 연결 */
const bodyParser = require('body-parser');
/* 쿠키에 데이터 저장 */
const cookieParser = require('cookie-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

/* 인증(auth) */
const { auth } = require('./middleware/auth');

/* Mongo DB 연결 */
const mongoose = require('mongoose');
const { User } = require('./models/User');

// Mongo DB URI 보호를 위해 분할
const config = require('./config/key');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~안녕하신가요??'))

/* 회원 가입 */
app.post('/api/users/register', (req, res) => {

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

/* 로그인 */
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일이 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, userInfo) =>{
        if(!userInfo){
            return res.json({
                loginSucess: false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
            return res.json({
                loginSucess: false,
                message: "비밀번호가 틀렸습니다."
            })
            
            // 비밀번호까지 맞다면 토큰을 생성하기
            userInfo.generateToken((err, userInfo) => {
                if(err){
                    return res.status(400).send(err);
                }else{
                    // 토큰을 저장한다. 어디에?(쿠키, 로컬스토리지 등..)
                    return res.cookie("x_auth", userInfo.token)
                    .status(200)
                    .json({ 
                        loginSucess: true,
                        userId: userInfo._id
                    });
                }
            })
        })
    })
})

/* 인증(auth) */
// role 1: 어드민, role 2: 특정 부서 어드민
// role 0: 일반 유저, role 0이 아니면 관리자(어드민)
app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 True라는 말
    res.status(200).json({
        _id: req.user_id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id},
        {token: ""},
        (err, user) => {
            if(err) return res.json({sucess: false, err});
            return res.status(200).send({
                sucess: true
            })
        })
})
/* 정상 접속 확인 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))