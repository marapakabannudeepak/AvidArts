const express = require('express');

const mongoose = require('mongoose');

const blogRouter = require('./routes/index');
const Blog = require('./models/Blog');
const app = express();
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo');
const methodOverride = require('method-override');


mongoose.connect('mongodb+srv://sreelekha:sreelekha1@cluster0.xhibn.mongodb.net/test',{
useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/artworks', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });
  response.render('indexix', { blogs : blogs });
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));
app.use('/index', blogRouter);

var index = require('./routes/index');
app.use('/', index);
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/public', express.static(path.resolve(__dirname, "assets/public")))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const feedbackSchema={
  name: String,
  feedback: String
}

const feedback=mongoose.model("feedback",feedbackSchema);


// load routers
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});

