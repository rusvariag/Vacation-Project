// Get packages
const express = require('express');
const router = express.Router();
const passport = require('passport');
// Get services
const { createLogMessage, createUser, countUsers } = require('../services');
// Get utils
const { outerHandler, createHashedPassword } = require('../utils');
// Get validations
const { createUserValidation } = require('../validations');

// Login to the application
router.post('/signin',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }), (req, res, next) => {
        const { first_name, last_name, isAdmin } = req.user;
        createLogMessage([`${first_name} ${last_name}`, new Date(), `[user-controller: path /signin]: This user made login to the system`]);
        res.json({ first_name, last_name, isAdmin });
    }
);

// Login to the application
router.get('/logged', (req, res) => {
    if (req.isAuthenticated()) {
        const { first_name, last_name, isAdmin } = req.user;
        createLogMessage([`${first_name} ${last_name}`, new Date(), `[user-controller: get /logged]: This user checked if he logget in`]);
        return res.json({ first_name, last_name, isAdmin });
    }
    return res.sendStatus(401);
});

// Register to the application
router.post('/signup', createUserValidation, (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    createLogMessage([`${first_name} ${last_name}`, new Date(), `[user-controller: post /signup]: This user is newly created in the system`]);
    outerHandler(res, createUser, first_name, last_name, username, createHashedPassword(password));
});

// Check if user is unique to the system
router.post('/is_valid', (req, res) => {
    const { username } = req.body;
    createLogMessage([`Guest`, new Date(), `[user-controller: post /is_valid]: Check if the user is valid`]);
    outerHandler(res, countUsers, username);
});

// Logout from the application
router.get('/signout', (req, res) => {
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[user-controller: get /signout]: This user asked to logged out`]);
    req.session.destroy(err => {
        if (err) {
            createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[user-controller: path /signout]: Error in session destroy modul`]);
            res.sendStatus(400);
        }
        createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[user-controller: path /signout]: Logout user from the system`]);
        req.logout();
        res.cookie('connect.sid', req.cookies['connect.sid'], { maxAge: -1 });
        res.sendStatus(200);
    });
});

module.exports = router; 