// Define queries to run under this service
const INSERT_QUERY = 'INSERT INTO `system_logs` (`user`,`timestamp`, `message`) VALUES (? ,? ,?)';

// Create new user
const createLogMessage = async (args) => {
    const [results] = await global.mySqlConnection.execute(INSERT_QUERY, args);
    return results;
}

module.exports = { createLogMessage }; 