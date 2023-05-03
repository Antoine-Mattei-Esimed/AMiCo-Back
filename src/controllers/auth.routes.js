const express = require( "express" );
const router = express.Router();
const userRepository = require( "../models/user-repository" );
const { passwordsAreEqual } = require( "../security/crypto" );
const { generateAuthToken } = require( "../security/auth" );
const { body } = require( "express-validator" );

const { validateBody } = require( "./validation/route.validator" );

router.post( "/login",
             body( "firstName" )
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
	             
	             const { firstName, password } = req.body;
	             
	             const user = await userRepository.getUserByFirstName( firstName );
	             if ( !user || !( user && passwordsAreEqual( password,
	                                                         user.password ) ) ) {
		             res.status( 401 )
		                .send( "Unauthorized" );
		             
		             return;
	             }
	             
	             const token = generateAuthToken( user.id,
	                                              user.firstName,
	                                              user.isAdmin );
	             
	             res.json( { token } );
             } );

exports.initializeRoutes = () => router;
