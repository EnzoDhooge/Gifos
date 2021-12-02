require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const path = require('path');


// Inicialization
const app = express();



// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
const hbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes
app.use(require('./routes/home'));


// Public
app.use(express.static(path.join(__dirname, 'public')));



// Stariting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});