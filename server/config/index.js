module.exports = {
	dbConfig: {
		host: 'localhost',
		insecureAuth: true,
		database: 'project_3',
		multipleStatements: true,
	},
	cookieConfig: {
		secure: false,
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24,
	},
	passwordHash: 'myverysecretmassage',
};
