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

const express               = require( "express" );
const router                = express.Router();
const userRepository        = require( "../models/user-repository" );
const { passwordsAreEqual } = require( "../security/crypto" );
const { generateAuthToken } = require( "../security/auth" );
const { body }              = require( "express-validator" );

const { validateBody } = require( "./validation/route.validator" );

router.post( "/login",
			 body( "email" )
				 .notEmpty(),
			 body( "password" )
				 .notEmpty(),
			 async (
				 req,
				 res
			 ) => {
				 try {
					 validateBody( req );
				 } catch ( e ) {
					 res.status( 500 )
						.send( e.message );
					 return;
				 }
				 
				 const {
						   email,
						   password
					   } = req.body;
				 
				 const user = await userRepository.getUserByEmail( email );
				 if ( !user || !( user && passwordsAreEqual( password,
															 user.password ) ) ) {
					 res.status( 401 )
						.send( "Unauthorized" );
					 
					 return;
				 }
				 
				 const token = generateAuthToken( user.id,
												  user.nom,
												  user.prenom,
												  user.email );
				 
				 res.json( { success : token } );
			 } );

exports.initializeRoutes = () => router;
