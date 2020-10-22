// Get packages
const express = require('express');
const router = express.Router();
// Get services
const { createLogMessage, selectVacations, selectVacation, createVacation, deleteVacation, updateVacation } = require('../services');
// Get utils
const { outerHandler } = require('../utils');
// Get validations
const { selectVacationValidation, deleteVacationValidation, createVacationValidation, updateVacationValidation } = require('../validations');

// Select all vacations route
router.get('/', (req, res) => {
    const { id } = req.user;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[vacation-controller]: selecting all vacations in the database`]);
    outerHandler(res, selectVacations, id);
});

// Select vacation route
router.get('/:id', selectVacationValidation, (req, res) => {
    const id = req.params.id;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[vacation-controller]: selecting vacation with ${id}`]);
    outerHandler(res, selectVacation, req.user.id ,id);
});

// Create vacation route
router.post('/', createVacationValidation, (req, res) => {
    const { destination, from_date, to_date, price, description, picture } = req.body;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[vacation-controller]: creating new vacation with destination ${destination}`]);
    outerHandler(res, createVacation, destination, new Date(from_date).toLocaleDateString('fr-CA'), new Date(to_date).toLocaleDateString('fr-CA'), price, description, picture);
});

// Delete vacation route
router.delete('/:id', deleteVacationValidation, (req, res) => {
    const id = req.params.id;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[vacation-controller]: delete vacation with id ${id}`]);
    outerHandler(res, deleteVacation, id);
});

// Update vacation route
router.patch('/:id', updateVacationValidation, (req, res) => {
    const { destination, from_date, to_date, price, description, picture, id } = req.body;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[vacation-controller]: updating vacation with ${id}`]);
    outerHandler(res, updateVacation, destination, new Date(from_date).toLocaleDateString('fr-CA'), new Date(to_date).toLocaleDateString('fr-CA'), price, description, picture, id);
});

module.exports = router;