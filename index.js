const express = require('express') //express 모듈을 가져온다.
const app = express() //새로운 app를 만든다.
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sunny1User:sunny5820@sunny69.icxyt.mongodb.net/<dbname>?retryWrites=true&w=majority',{
  useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => { //root 폴더에 hello world가 ㅗ인다.
  res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})