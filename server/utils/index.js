// Get packages
const crypto = require('crypto');
const _ = require('lodash');
// Get configurations
const { passwordHash } = require('./../config');
const { selectVacation } = require('../services');

const VACATION_MUST_FIELDS = ['destination', 'from_date', 'to_date', 'price'];
const USER_MUST_FIELDS = ['first_name', 'last_name', 'username', 'password'];

const badRequestHandler = res => res.sendStatus(400);
const unauthorizedHandler = res => res.sendStatus(403);

const createHashedPassword = password => crypto.createHmac('sha256', passwordHash).update(password).digest('hex');

const numberValidator = (n) => {
    return !_.isNumber(Number(n)) || isNaN(Number(n))
}

const outerHandler = async (res, handler, ...args) => {
    try {
        const result = await handler(args);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
}

module.exports = {
    VACATION_MUST_FIELDS,
    USER_MUST_FIELDS,
    badRequestHandler,
    unauthorizedHandler,
    outerHandler,
    createHashedPassword,
    numberValidator
};