const express = require('express') //express 모듈을 가져온다.
const app = express() //새로운 app를 만든다.
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require('./models/User');

//application/x-www-form-urlencoded 분석해서 가져오게 해준다.
app.use(bodyParser.urlencoded({extended:true}));
//application/json 분석해서 가져온다.
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('config.mongoURI',{
  useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => { //root 폴더에 hello world가 보인다.
  res.send('Hello World!!!~즐겁게')
})


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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})