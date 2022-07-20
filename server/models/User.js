const mongoose = require('mongoose');
/* 비밀번호 앙호화 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
/* 토큰 생성 */
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 비밀번호 암호화
userSchema.pre('save', function(next){
    // 비밀번호 가져오기
    let user = this;

    // 비밀번호가 변경될 때만!
    if(user.isModified('password')){
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash          
                // 위 과정을 끝내고 전송
                next()
            })
        })
    }else{
        next()
    }
})

/* 로그인 */
userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword와 암호화된 비밀번호가 서로 맞는지 비교
    // plainPassword를 복호화할 수 없으므로 plainPassword를 암호화해서 비교한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }else{
            return cb(null, isMatch);
        }
        
    })
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    // jsonwebtoken을 이용해서 token 생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id
    user.token = token;
    user.save(function(err, user) {
        if(err){
            return cb(err);
        }else{
            return cb(null, user);
        }
    })
}

userSchema.statics.findByToken = function(token, cb) {
    let user = this;

    // 1. 토큰을 Decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}
const User = mongoose.model('User', userSchema)

module.exports = {User}