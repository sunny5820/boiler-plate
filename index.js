const express = require('express') //express 모듈을 가져온다.
const app = express() //새로운 app를 만든다.
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const {User} = require('./models/User');

//application/x-www-form-urlencoded 분석해서 가져오게 해준다.
app.use(bodyParser.urlencoded({extended:true}));
//application/json 분석해서 가져온다.
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) =>  //root 폴더에 hello world가 보인다.
  res.send('Hello World!!!~즐겁게')
)


app.post('/register', (req, res)=>{ 
  //회원가입할때 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/login', (req, res)=>{
  //요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email:req.body.email }, (err, user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})
      
      //비밀번호까지 맞다면 토큰 생성하기
    user.generateToken((err, user)=>{
      if(err) return res.status(400).send(err);

      //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
      res.cookie("x.auth", user.token)
      .status(200)
      .json({loginSuccess:true, userId:user._id})
      
     })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})