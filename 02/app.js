const express = require('express')
const fs = require('fs')

const app = express()

app.get('/todos', (req, res) => {
  //获取todos列表
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if(err) { 
        return res.status(500).json({ 
          error: err.message
        })
      }
      //获取数据成功，将数据转换为JSON格式
    const db =JSON.parse(data)
    //发送成功状态码同时发送数据
    res.status(200).json(db.todos)
  })
  // res.send("get /todos")
})

app.get('/todos/:id', (req, res) => {
   fs.readFile('./db.json', 'utf8', (err, data) => {
    if(err) { 
        return res.status(500).json({ 
          error: err.message
        })
      }
      //获取数据成功，将数据转换为JSON格式
    const db =JSON.parse(data)
  //
    const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id)) 

    //判断TODO
    if(!todo){
      return res.status(404).end()
    }
    //发送成功状态码同时发送数据
    res.status(200).json(todo)
  })
  // res.send(`get /todos/${req.params.id}`)
})

app.post('/todos', (reg, res) => {
  res.send("post todos")
})

app.patch('/todos', (reg, res) => {
  res.send("patch todos")
})

app.delete('/todos/:id', (reg, res) => {
  res.send(`delete todos/${ reg.params.id}`)
})

app.listen(3000, () => {
  console.log("todos 请求服务启动")
})
