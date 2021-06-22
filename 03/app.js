
// 应用程序级别中间件
const express = require('express')

const app = express()


// 限定请求路径
// app.use('/user/:id', function(req, res, next) {
//   console.log("request type:", req.method)
//   next()
// })


//不做任何限定
// app.use(function(req, res, next){
//   console.log('Time', Date.now())
//   next()
// })
// 多个处理函数
// app.use('user/:id', function(req, res, next){
//   console.log('request URL:', req.originalUrl)
//   next()
// }, function(req, res, next){
//   console.log("request type:", req.method)
// })

//为同一个路径添加多个处理中间件
app.get('/user/:id', function(req, res, next){
    console.log('request URL:', req.originalUrl)
    next()
  }, function(req, res, next){
    res.send('usr info')
    next()
  })

app.get('/user/:id', function(req, res, next) {
  res.end(req.params.id)
})
// 限定请求方法和路径
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log("服务端已经启动了")
})