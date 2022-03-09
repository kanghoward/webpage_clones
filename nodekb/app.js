const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressValidator = require('express-validator');
const flash = require('connect-flash')
const session = require('express-session')

mongoose.connect('mongodb://localhost/nodekb')
let db = mongoose.connection

//init app
const app = express()

// BodyPaser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')))

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
  
// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// // express validatr middleware
// app.use(expressValidator({
//     errorFormatter: function (param, msg, value) {
//       var namespace = param.split('.')
//         , root = namespace.shift()
//         , formParam = root;
  
//       while (namespace.length) {
//         formParam += '[' + namespace.shift() + ']';
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value
//       };
//     }
//   })); DEPRECATED

//bring in models
let Article = require('./models/article.js')
const { read } = require('fs')

db.once('open', ()=> {
    console.log("connected to mongodb")
})

//check for db errors
db.on('error', err => {
    console.log(err)
})

//load view engine
// (set views to be default folder where res.render looks at)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//home route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            })
        }
    })
    
})

let articles = require('./routes/articles')
let users = require('./routes/users')
app.use('/articles', articles)
app.use('/users', users)

//start server
app.listen(3000, () => {
    console.log('Server started on port 3000...')
})