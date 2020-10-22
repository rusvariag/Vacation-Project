// Get packages
const _ = require('lodash');
// Get utils
const { USER_MUST_FIELDS, badRequestHandler } = require('../utils');
// Get services
const { countUsers } = require('../services');

// Check the single vacation id parameter
const createUserValidation = async (req, res, next) => {
    const { count } = await countUsers([req.body.username]);
    const fields = Object.keys(req.body);    
    const isUsernameEmpty = count === 0;
    const isFieldsExist = _.size(_.difference(USER_MUST_FIELDS, fields)) === 0;
    const isFieldsValid = Object.values(req.body).every(x => !!x);
    const validations = isFieldsExist && isFieldsValid && isUsernameEmpty
    if (validations) {
        return next();
    }
    return badRequestHandler(res);
}

module.exports = {
    createUserValidation,
}