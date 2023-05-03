const { Sequelize } = require( "sequelize" );
const path          = require( "path" );
require( "dotenv" ).config(
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
      host     : process.env.PG_HOST,
      database : process.env.PG_DB,
      username : process.env.PG_USER,
      password : process.env.PG_PASSWORD,
      port     : process.env.PG_PORT,
      logging  : false
    }
);