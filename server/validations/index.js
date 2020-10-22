// Aggregate module that provide interface for scalable application
const { selectVacationValidation, createVacationValidation, updateVacationValidation, deleteVacationValidation } = require('./vacation-validations');
const { createUserValidation } = require('./user-validations');
const { deleteFollowValidation, createFollowValidation } = require('./follow-validations');

module.exports = {
    selectVacationValidation,
    createVacationValidation,
    updateVacationValidation,
    deleteVacationValidation,
    createUserValidation,
    deleteFollowValidation,
    createFollowValidation,
}