const express = require('express');
const path = require('path');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

//setings
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
require('./routes/userRoutes')(app);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
	console.log('server on port 3000');
});	