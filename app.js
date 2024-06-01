const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

const path = require('path')
const handlebars = require('express-handlebars')
// 註冊 Handlebars 樣板引擎，並指定副檔名為 .hbs
app.engine('hbs', handlebars({ extname: '.hbs' }))
// 設定使用 Handlebars 做為樣板引擎
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

// const db = require('./models') 測試與資料庫連線用

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
