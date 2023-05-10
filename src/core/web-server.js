const express = require( "express" );
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require( "./middlewares" );
const amicoMiddlewares = require( "./amico/middlewares" );
const userRoutes = require( "../controllers/user.routes" );
const authRoutes = require( "../controllers/auth.routes" );
const { sequelize } = require( "../models/db" );

class WebServer {
	app = undefined;
	port = 3000;
	server = undefined;
	
	constructor() {
		this.app = express();
		sequelize.sync()
		         .then( _ => {
			         console.log( "Database initialized" );
		         } );
		
		initializeConfigMiddlewares( this.app );
		amicoMiddlewares.initializeImagesMiddleware( this.app );
		this._initializeRoutes();
		initializeErrorMiddlwares( this.app );
	}
	
	start() {
		this.server = this.app.listen( this.port,
		                               () => {
			                               console.log( `AMiCo listening on port ${ this.port }` );
		                               } );
	}
	
	stop() {
		this.server.close();
	}
	
	_initializeRoutes() {
		this.app.use( "/users",
		              userRoutes.initializeRoutes() );
		this.app.use( "/auth",
		              authRoutes.initializeRoutes() );
	}
}

module.exports = WebServer;
