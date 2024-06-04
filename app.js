const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

const path = require('path')
const handlebars = require('express-handlebars')

const session = require('express-session')
const flash = require('connect-flash')
const SESSION_SECRET = 'secret'

// 註冊 Handlebars 樣板引擎，並指定副檔名為 .hbs
app.engine('hbs', handlebars({ extname: '.hbs' }))
// 設定使用 Handlebars 做為樣板引擎
app.set('view engine', 'hbs')

// 加入body.parser
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

// const db = require('./models') 測試與資料庫連線用

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
