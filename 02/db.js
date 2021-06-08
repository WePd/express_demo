const fs = require("fs")

//在nodejs的工具模块中提供的一种方法，将异步形式的callback转换为promise的形式
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
//现在readFIle是一个提供了promise支持的的操作文件

const path = require('path')

//默认路径
const dbPath = path.join(__dirname, './db.json')

//将数据文件封装起来
exports.getDb = async() => {
  const data = await readFile(dbPath, 'utf8')
  return JSON.parse(data)
}