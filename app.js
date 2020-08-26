var express = require('express');
const path = require('path');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
var session = require('express-session');


const config = require('./app/config/configs');

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "app/views"));
app.set("layout", path.join(__dirname, "app/views/layout"));
app.use(express.static(path.join(__dirname, "app/public")));
app.use(bodyParser.urlencoded({ extended: false }));

// var memoryStore = new session.MemoryStore();
app.use(session({   
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));


// For DB Connection
require('./app/config/connection');
// To Connect Apis
require('./app/api/index')(app);

app.listen(config.port, () => console.log(`server is running on ${config.port}`));


