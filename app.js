require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// test
const indexRouter = require('./routes/index_router');
const usersRouter = require('./routes/users_router');
const eventRouter = require('./routes/events_router.js');
const photosRouter = require('./routes/photos_router');
const clientRouter = require('./routes/client_router')

const app = express();
app.use(cors());
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/clients', clientRouter)
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);
app.use('/events', eventRouter)
app.use('/photos', photosRouter)
app.use('/users', usersRouter);


module.exports = app;
