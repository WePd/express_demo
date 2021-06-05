const express = require('express');

const app = express()

app.get('/', (req, res) => {
  console.log(req.method);//请求方法
  console.log(req.url); // 请求地址
  console.log(req.headers); // 请求头
  res.send("Hello World")
})
// //启动服务
// app.listen(3000, () => {
//   console.log("这是运行在3000端口的服务")
// })

app.post('/', (req, res) => {
  //req是获取请求对象数据的， res则是为发送响应的对象
  //它是继承自node中的http请求的
//设置响应状态码
  res.statusCode = 333;
//停止响应
  res.end()
  res.send("这是Post请求")
})


app.put('/user', (req, res) => {
  res.send("/user")
})

app.delete('/user', (req, res) => {
  res.send("delete")
})

app.listen(3000, () => {
  console.log("post请求开启")
})