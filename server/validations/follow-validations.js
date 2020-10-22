// Get utils
const { badRequestHandler, numberValidator } = require('../utils');

// Check the follow vacation_id parameter
const deleteFollowValidation = (req, res, next) => {
    if (numberValidator(req.params.id)) {
        return badRequestHandler(res);
    }
    return next();
}

// Check the follow vacation_id parameter in the body
const createFollowValidation = (req, res, next) => {
    if (numberValidator(req.body.vacation_id)) {
        return badRequestHandler(res);
    }
    return next();
}

module.exports = {
    deleteFollowValidation,
    createFollowValidation,
}