// Get packages
const _ = require('lodash');
// Get utils
const { VACATION_MUST_FIELDS, badRequestHandler, unauthorizedHandler, numberValidator } = require('../utils');

// Check the single vacation id parameter
const selectVacationValidation = (req, res, next) => {
    if (numberValidator(req.params.id)) {
        return badRequestHandler(res);
    }
    return next();
}

// Check the delete vacation id parameter
const deleteVacationValidation = (req, res, next) => {
    if (!req.user.isAdmin) {
        return unauthorizedHandler(res);
    }
    if (numberValidator(req.params.id)) {
        return badRequestHandler(res);
    }
    return next();
}

// Check the create vacation parameters
const createVacationValidation = (req, res, next) => {   
    if (!req.user.isAdmin) {
        return unauthorizedHandler(res);
    }
    const fields = Object.keys(req.body);
    const isFieldsExist = _.size(_.difference(VACATION_MUST_FIELDS, fields)) === 0;
    const isDatesValid = _.isDate(new Date(req.body.from_date)) && _.isDate(new Date(req.body.to_date));
    const isPriceValid = _.isNumber(Number(req.body.price));
    const validations = isFieldsExist && isDatesValid && isPriceValid
    if (validations) {
        return next();
    }
    return badRequestHandler(res);
}

// Check the update vacation parameters
const updateVacationValidation = (req, res, next) => {
    if (!req.user.isAdmin) {
        return unauthorizedHandler(res);
    }
    const isDatesValid = _.isDate(new Date(req.body.from_date)) && _.isDate(new Date(req.body.to_date));
    const isPriceValid = _.isNumber(Number(req.body.price));
    const validations = isDatesValid && isPriceValid
    if (validations) {
        return next();
    }
    return badRequestHandler(res);
}

module.exports = {
    selectVacationValidation,
    createVacationValidation,
    updateVacationValidation,
    deleteVacationValidation,
}