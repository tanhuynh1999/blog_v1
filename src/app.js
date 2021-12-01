const express = require('express');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database');
const path = require('path');
const {
    engine
} = require('express-handlebars');

//Path router
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');

const app = express();
const port = 3000;

app.use(cookieParser())

// Express-handlebars
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

//Path public
app.use(express.static(__dirname + '/public'));

//Connect router
app.use('', homeRouter);
app.use('', userRouter);
app.use('', blogRouter);

//connect database
connectDatabase.connect();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})