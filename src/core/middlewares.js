/*
 * AMiCo - Logiciel de gestion de micro-entreprises.
 * Copyright (c) 2023 - Antoine Mattei
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

require( "dotenv" )
	.config( {
				 path : "../../.env"
			 } );
const express              = require( "express" );
const cors                 = require( "cors" );
const { DateTime }         = require( "luxon" );
const { expressjwt : jwt } = require( "express-jwt" );

const initJsonHandlerMiddlware = ( app ) => app.use( express.json() );

const initCorsMiddlware = ( app ) => app.use( cors() );

const initLoggerMiddlware = ( app ) => {
	app.use( (
				 req,
				 res,
				 next
			 ) => {
		const begin = new DateTime( new Date() );
		
		res.on( "finish",
				() => {
					const requestDate = begin.toString();
					const remoteIP    = `IP: ${ req.connection.remoteAddress }`;
					const httpInfo    = `${ req.method } ${ req.baseUrl || req.path }`;
					
					const end               = new DateTime( new Date() );
					const requestDurationMs = end.diff( begin )
												 .toMillis();
					const requestDuration   = `Duration: ${ requestDurationMs }ms`;
					
					console.log( `[${ requestDate }] - [${ remoteIP }] - [${ httpInfo }] - [${ requestDuration }]` );
				} );
		next();
	} );
};

const initJwtMiddleware = ( app ) => {
	app.use(
		jwt( {
				 secret     : process.env.SECRET,
				 algorithms : [ "HS256" ]
			 } )
			.unless( {
						 path : [
							 "/auth/login",
							 /\/assets*/,
							 "/users/"
						 ]
					 } )
	);
};

exports.initializeConfigMiddlewares = ( app ) => {
	initJsonHandlerMiddlware( app );
	initCorsMiddlware( app );
	initLoggerMiddlware( app );
	initJwtMiddleware( app );
};

exports.initializeErrorMiddlwares = ( app ) => {
	app.use( (
				 err,
				 req,
				 res,
				 next
			 ) => {
		if ( err.code === "permission_denied" ) {
			res.status( 403 )
			   .send( "Forbidden" );
			return;
		}
		
		res.status( 500 )
		   .send( err.message );
	} );
};
