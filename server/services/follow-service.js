// Define queries to run under this service
const SELECT_QUERY = 'SELECT v.destination, COUNT(user_id) AS count FROM project_3.follows f LEFT JOIN project_3.vacations v ON f.vacation_id = v.id GROUP BY v.destination';
const INSERT_QUERY = 'INSERT INTO `follows` (user_id, vacation_id) VALUES (?, ?)';
const DELETE_QUERY = 'DELETE FROM `follows` WHERE user_id = ? AND vacation_id = ?';

// Select the ids of following vacations
const selectFollow = async (args) => {
    const results = await global.mySqlConnection.execute(SELECT_QUERY, args);
    const [rows] = results;
    return rows;
}

// Follow some vacation
const createFollow = async (args) => {
    const [results] = await global.mySqlConnection.execute(INSERT_QUERY, args);
    return results;
}

// Unfollow some vacation
const deleteFollow = async (args) => {
    const [results] = await global.mySqlConnection.execute(DELETE_QUERY, args);
    return results;
}

module.exports = { selectFollow, createFollow, deleteFollow }