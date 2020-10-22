const { createHashedPassword } = require('./../utils')

const passportConfig = {
    localStrategyHandler: (username, password, done) => {
        global.mySqlConnection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, createHashedPassword(password)])
            .then(data => {
                const [[user]] = data;
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                return done(null, user);
            }).catch(err => {
                return done(err);
            })
    },
    serializeUser: (user, done) => {
        done(null, user);
    },
    deserializeUser: (user, done) => {
        done(null, user);
    },
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.sendStatus(401);
    },
}

module.exports = passportConfig;