// Environment options
const PORT = process.env.PORT || 3000;

// Get packages
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');

// Get configurations
const { dbConfig, cookieConfig } = require('./config');
const { init_db, init_admin, init_data, is_init } = require('./database');
const { localStrategyHandler, serializeUser, deserializeUser, isAuthenticated } = require('./passport');

// Start processes
const app = express();
const httpServer = http.createServer(app);
app.use(cors({
    origin: '*:*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'my_secret_john_bryce!$@#$',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(dbConfig),
    cookie: cookieConfig
}));

// Start passport
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Get controllers
const { apiVacationController, apiFollowController, apiUserController } = require('./controllers');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './../client/build')));

// Routers in the node server
app.use('/auth', apiUserController);
app.use('*', isAuthenticated);
app.use('/api/follows', apiFollowController);
app.use('/api/vacations', apiVacationController);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './../client/build'));
});

// Define the start server function
const init = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig); // Wait to database connection
        global.mySqlConnection = connection;                       // Assign the connection on global object  
        const [status] = await is_init(connection);                // Check if database is init
        if (status.length === 0) {
            await init_db(connection);                                 // Create database schema 
            await init_admin(connection);                              // Create admin record
            await init_data(connection);                               // Create initual data
        }
        const server = await httpServer.listen(PORT, (err) => {           // Start the server
            if (err) console.log(err);
            else console.log(`Server run on port ${PORT}`);
        });
        // Socket setup
        const io = socket(server);
        io.on('connection', (socket) => {
            socket.on('vacationDelete', (data) => {
                socket.broadcast.emit('vacationDelete', data);
            });
            socket.on('vacationCreate', (data) => {
                socket.broadcast.emit('vacationCreate', data);
            });
            socket.on('vacationUpdate', (data) => {
                socket.broadcast.emit('vacationUpdate', data);
            });
        });
    } catch (err) { // Catch errors
        console.log(err);
    }
}

// Start the server
init()























// // Environment options
// const PORT = process.env.PORT || 3000;

// // Get packages
// const express = require('express');
// const mysql = require('mysql2/promise');
// const path = require('path');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const http = require('http').createServer(app);

// // Get configurations
// const { dbConfig, cookieConfig } = require('./config');
// const { init_db, init_admin, init_data, is_init } = require('./database');
// const { localStrategyHandler, serializeUser, deserializeUser, isAuthenticated } = require('./passport');

// // Start processes
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//     secret: 'my_secret_john_bryce!$@#$',
//     resave: false,
//     saveUninitialized: true,
//     store: new MySQLStore(dbConfig),
//     cookie: cookieConfig
// }));

// // Start passport
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use('local', new LocalStrategy(localStrategyHandler));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

// // Get controllers
// const { apiVacationController, apiFollowController, apiUserController } = require('./controllers');

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, './../client/build')));

// // Routers in the node server
// app.use('/auth', apiUserController);
// app.use('*', isAuthenticated);
// app.use('/api/follows', apiFollowController);
// app.use('/api/vacations', apiVacationController);

// // Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + './../client/build'));
// });

// // Define the start server function
// const init = async () => {
//     try {
//         const connection = await mysql.createConnection(dbConfig); // Wait to database connection
//         global.mySqlConnection = connection;                       // Assign the connection on global object  
//         const [status] = await is_init(connection);                // Check if database is init
//         if (status.length === 0) {
//             await init_db(connection);                                 // Create database schema 
//             await init_admin(connection);                              // Create admin record
//             await init_data(connection);                               // Create initual data
//         }
//         return app.listen(PORT, (err) => {                                // Start the server
//             if (err) console.log(err);
//             else console.log(`Server run on port ${PORT}`);
//         });
//     } catch (err) {                                                // Catch errors
//         console.log(err);
//     }
// }

// // Start the server
// const server = init();