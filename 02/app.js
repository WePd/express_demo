const express = require('express')
const fs = require('fs')
//加载创建的db封装函数
const { getDb, saveDb } = require('./db')

const app = express()

//解析表单请求体 application/json
app.use(express.json())
//application/x-www-form-urlencode
app.use(express.urlencoded())


app.get('/todos', async (req, res) => {
  try{
    const db = await getDb()
    res.status(200).json(db.todos)
  }catch(err){
    res.status(500).json({ 
      error: err.message
    })
  }
  //获取todos列表
  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if(err) { 
  //       return res.status(500).json({ 
  //         error: err.message
  //       })
  //     }
  //     //获取数据成功，将数据转换为JSON格式
  //   const db =JSON.parse(data)
  //   //发送成功状态码同时发送数据
  //   res.status(200).json(db.todos)
  // })
  // res.send("get /todos")
})

app.get('/todos/:id', async (req, res) => {
  try{
    const db = await getDb()

    const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))

    if(!todo){
        return res.status(404).end()
      }

    res.status(200).json(todo)
  }catch(err){
    res.status(500).json({ 
      error: err.message
  })
}  
  //  fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if(err) { 
  //       return res.status(500).json({ 
  //         error: err.message
  //       })
  //     }
  //     //获取数据成功，将数据转换为JSON格式
  //   const db =JSON.parse(data)
  // //
  //   const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id)) 

    //判断TODO
    // if(!todo){
    //   return res.status(404).end()
    // }
    // //发送成功状态码同时发送数据
    // res.status(200).json(todo)
  // })
  // res.send(`get /todos/${req.params.id}`)
})

app.post('/todos', async (req, res) => {
  // console.log(req.body)
  //获取请求体参数
  try{
    const todo = req.body

  //数据验证
  if(!todo.title){
    return res.status(422).json(
      {error: "the file title is required" }
    )
  }
  //数据验证通过，把数据存入db中
  const db = await getDb()

  const lastToDo = db.todos[db.todos.length - 1]
  todo.id = lastToDo ? lastToDo.id + 1 : 1
  db.todos.push(todo)
  //提交数据
  await saveDb(db)
  //发送响应
  res.status(200).json(todo)
  res.send("post todos")
  }catch(err){
    res.status(500).json({
      error: err.message
    })
  }
})

app.patch('/todos/:id', async (req, res) => {
  try{
    //1 獲取表單數據 
    const todo = req.body 
    //獲取要修改的任務項
    const db = await getDb()
    // db.todos.find(todo => todo.id === req.params.id)
    // 這樣寫有一個問題就是侯敏獲得是一個字符串二前面的是一個數字，所以要有一個轉換過程
    const ret = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))

    if(!ret){
      res.status(404).end()
    }
    //合併,將修改過的數據合併到前面查到的結果中
    Object.assign(ret, todo)

    await saveDb(db)

    res.status(200).json(ret)
    }catch(err){
      res.status(500).json({
        err: err.meaasge
    })
  }
    res.send("patch todos")
})

app.delete('/todos/:id', async (req, res) => {
  try{
    const todoId = Number.parseInt(req.params.id)
    const db = await getDb()
    const index = db.todos.findIndex(todo => todo.id = todoId)
    if(index === -1){
      return res.status(404).end()
    }
    db.todos.splice(index, 1)
    await saveDb(db)
    res.status(200).end()
  }catch(err){
    res.status(500).json({
      error: err.massage
    })
  }


  res.send(`delete todos/${ reg.params.id}`)
})

app.listen(3000, () => {
  console.log("todos 请求服务启动")
})
