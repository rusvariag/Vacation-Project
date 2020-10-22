// Define queries to run under this service
const INSERT_QUERY = 'INSERT INTO `users` (`first_name`, `last_name`, `username`, `password`) VALUES (? ,?, ?, ?)';
const COUNT_QUERY = 'SELECT COUNT(*) AS count FROM `users` WHERE username = ?';
const SELECT_QEURY = 'SELECT username FROM `users` WHERE username LIKE ?';

// Create new user
const createUser = async (args) => {
    const [results] = await global.mySqlConnection.execute(INSERT_QUERY, args);
    return results;
}

// Validate user
const countUsers = async (args) => {
    const [results] = await global.mySqlConnection.execute(COUNT_QUERY, args);
    const [rows] = results;
    return rows;
}

module.exports = { createUser, countUsers }; 