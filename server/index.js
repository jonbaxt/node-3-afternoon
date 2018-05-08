const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

//Middleware
const checkForSession = require('./middlewares/checkForSession');

//Controller
const swag_controller = require('./controllers/swag_controller');
const auth_control = require('./controllers/auth_controller');
const cart_control = require('./controllers/cart_controller');
const search_contol = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);
app.use( express.static( `${__dirname}/build`));

// The swag controller
app.get('/api/swag', swag_controller.read);

// Authorizers
app.post('/api/login', auth_control.login);
app.post('/api/register', auth_control.register);
app.post('/api/signout', auth_control.signout);
app.get('/api/user', auth_control.getUser);

// The cart
app.post('/api/cart', cart_control.add);
app.post('/api/checkout', cart_control.checkout);
app.delete('/api/cart', cart_control.delete);

// Search 
app.get( '/api/search', search_contol.search);


const port = 3000;
app.listen( port, () => console.log(`Port ${port} is now on.`) );