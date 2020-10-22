// Get packages
const express = require('express');
const router = express.Router();
// Get services
const { createLogMessage, selectFollow, createFollow, deleteFollow } = require('../services');
// Get utils
const { outerHandler } = require('../utils');
// Get validations
const { deleteFollowValidation, createFollowValidation } = require('../validations');

// Select all following vacations
router.get('/', (req, res) => {
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[follow-controller: path get /]: Select all the follows`]);
    outerHandler(res, selectFollow);
});

// Create follow vacation
router.post('/', createFollowValidation, (req, res) => {
    const { vacation_id } = req.body;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[follow-controller: path post /]: User follow vacation with id ${vacation_id}`]);
    outerHandler(res, createFollow, req.user.id, vacation_id);
});

// Delete vacation route
router.delete('/:id', deleteFollowValidation, (req, res) => {
    const vacation_id = req.params.id;
    createLogMessage([`${req.user.first_name} ${req.user.last_name}`, new Date(), `[follow-controller: path delete /]: User unfollow vacation with id ${vacation_id}`]);
    outerHandler(res, deleteFollow, req.user.id, vacation_id);
});

module.exports = router;