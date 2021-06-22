//路由模块
const express = require('express')

//1创建路由实例，相当于一个mini express
const router = express.Router()
// 2配置路由
router.get('/foo', (req, res) => {
  res.send('get /foo')
})
router.post('/foo', (req, res) => {
  res.send('post /foo')
})
// 3 导出路由
module.exports = router
// 4 将路由挂载集成到Express实例上
