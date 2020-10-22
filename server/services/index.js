// Aggregate module that provide interface for scalable application
const { selectVacations, selectVacation, createVacation, deleteVacation, updateVacation } = require('./vacation-service');
const { selectFollow, createFollow, deleteFollow } = require('./follow-service');
const { createUser, countUsers } = require('./user-service');
const { createLogMessage } = require('./system-log-services');

module.exports = {
    selectVacations,
    selectVacation,
    createVacation,
    deleteVacation,
    updateVacation,
    selectFollow,
    createFollow,
    deleteFollow,
    createUser,
    countUsers,
    createLogMessage,
}