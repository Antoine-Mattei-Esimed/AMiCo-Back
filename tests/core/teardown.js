const { sequelize } = require( "../../src/models/db" );

module.exports = async () => {
	global.webServer.stop();
	sequelize.truncate();
};
