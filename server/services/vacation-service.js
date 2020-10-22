// Define queries to run under this service
const SELECT_ALL_QUERY = 'SELECT v.*, CASE WHEN NOT ISNULL(f.vacation_id) THEN true ELSE false END AS `follow` FROM `vacations` AS v LEFT JOIN (SELECT * FROM `follows` WHERE user_id = ?) AS f ON v.id = f.vacation_id ORDER BY f.vacation_id DESC';
const SELECT_QUERY = 'SELECT v.*, CASE WHEN NOT ISNULL(f.vacation_id) THEN true ELSE false END AS `follow` FROM `vacations` AS v LEFT JOIN (SELECT * FROM `follows` WHERE user_id = ?) AS f ON v.id = f.vacation_id WHERE v.id = ?';
const INSERT_QUERY = 'INSERT INTO `vacations` (destination, from_date, to_date, price, description, picture) VALUES (?, ?, ?, ?, ?, ?)';
const DELETE_QUERY = 'DELETE FROM `vacations` WHERE id = ?';
const UPDATE_QUERY = 'UPDATE `vacations` SET destination = ?, from_date = ?, to_date = ?, price = ?, description = ?, picture = ? WHERE id = ?';

// Select all vacations in the system
const selectVacations = async (args) => {
    const results = await global.mySqlConnection.execute(SELECT_ALL_QUERY, args);
    const [rows] = results;
    return rows;
}

// Select single vacation based on the id
const selectVacation = async (args) => {
    const [results] = await global.mySqlConnection.execute(SELECT_QUERY, args);
    const [row] = results;
    return row;
}

// Create new vacation in the system
const createVacation = async (args) => {
    const [results] = await global.mySqlConnection.execute(INSERT_QUERY, args);
    return results;
}

// Update exist vacation with new data
const updateVacation = async (args) => {
    const [results] = await global.mySqlConnection.execute(UPDATE_QUERY, args);
    return results;
}

// Delete exist vacation from the system
const deleteVacation = async (args) => {
    const [results] = await global.mySqlConnection.execute(DELETE_QUERY, args);
    return results;
}

module.exports = { selectVacations, selectVacation, createVacation, deleteVacation, updateVacation }