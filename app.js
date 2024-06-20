require('dotenv').config()
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
const routes = require('./routes')

const handlebars = require('express-handlebars')
// const helpers = require('./helpers')
// const handlebarsHelpers = require('./helpers/handlebars-helpers')

// require('dotenv').config()

const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
app.use('/upload', express.static(path.join(__dirname, 'upload')))
const passport = require('./config/passport')
const SESSION_SECRET = 'secret'
const handlebarsHelpers = require('./helpers/handlebars-helpers')

// const { getUser } = require('./helpers/auth-helpers')
// 註冊 Handlebars 樣板引擎，並指定副檔名為 .hbs
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
// 設定使用 Handlebars 做為樣板引擎
app.set('view engine', 'hbs')

// 加入body.parser
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

// const db = require('./models') 測試與資料庫連線用

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }
  // console.log('req.cookie:', req.cookies)
  // console.log('req.header:', req.headers)
  next()
})

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
