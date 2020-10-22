const { createHashedPassword } = require('../utils');

module.exports = {
    init_db: async (conn) => {
        console.log('Creating application database table');
        const fs = require('fs');
        const path = require('path');
        const schemaFilePath = path.join(__dirname, './schema.sql');
        try {
            const sql = await fs.promises.readFile(schemaFilePath, 'utf-8');
            return conn.query(sql);
        } catch (err) {
            console.log('Failed to read schema file.');
            console.log(error);
        }
    },
    init_admin: async (conn) => {
        const query = 'INSERT IGNORE INTO users (id, first_name, last_name, username, password, isAdmin) VALUES(?, ?, ?, ?, ?, ?)';
        try {
            const params = [1, 'Admin', '', 'root', createHashedPassword('root'), true];
            return conn.execute(query, params);
        } catch (err) {
            console.log('Failed to insert admin data');
            console.log(error);
        }
    },
    init_data: async (conn) => {
        console.log('Fill initual first datafor application');
        const fs = require('fs');
        const path = require('path');
        const schemaFilePath = path.join(__dirname, './data.sql');
        try {
            const sql = await fs.promises.readFile(schemaFilePath, 'utf-8');
            return conn.query(sql);
        } catch (err) {
            console.log('Failed to read data file.');
            console.log(error);
        }
    },
    is_init: async (conn) => {
        const query = `SHOW TABLES LIKE 'users'`;
        try {
            return conn.execute(query);
        } catch (err) {
            console.log('Failed to query the db');
            console.log(error);
        }
    }
}






