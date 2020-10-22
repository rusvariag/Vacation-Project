// Aggregate module that provide interface for scalable application
const apiVacationController = require('./vacation-controller');
const apiFollowController = require('./follow-controller');
const apiUserController = require('./user-controller');

module.exports = {
    apiVacationController,
    apiFollowController,
    apiUserController,
}