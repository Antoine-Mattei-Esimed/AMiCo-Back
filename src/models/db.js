const { Sequelize } = require( "sequelize" );
const path = require( "path" );
require( "dotenv" )
	.config(
		{
			path : path.join(
				__dirname,
				"../../.env.sequelize"
			)
		}
	);

exports.sequelize = new Sequelize(
	{
		dialect  : "postgres",
		host     : process.env.POSTGRES_HOST,
		database : process.env.POSTGRES_DB,
		username : process.env.POSTGRES_USER,
		password : process.env.POSTGRES_PASSWORD,
		port     : process.env.POSTGRES_PORT,
		logging  : false
	}
);