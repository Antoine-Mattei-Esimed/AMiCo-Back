const express = require( "express" );
const router = express.Router();
const userRepository = require( "../models/user-repository" );
const { validateBody } = require( "./validation/route.validator" );
const { body } = require( "express-validator" );
const guard = require( "express-jwt-permissions" )(
	{
		requestProperty : "auth"
	} );

router.get( "/",
            async (
	            req,
	            res
            ) => {
	            res.send( await userRepository.getUsers() );
            } );

router.get( "/:firstName",
            guard.check( "admin" ),
            async (
	            req,
	            res
            ) => {
	            const foundUser = await userRepository.getUserByFirstName( req.params.firstName );
	            
	            if ( !foundUser ) {
		            res.status( 500 )
		               .send( "User not found" );
		            return;
	            }
	            
	            res.send( foundUser );
            } );

router.post(
	"/",
	body( "firstName" )
		.notEmpty(),
	body( "lastName" )
		.notEmpty(),
	body( "password" )
		.notEmpty()
		.isLength( { min : 8 } ),
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
		
		await userRepository.createUser( req.body );
		res.status( 201 )
		   .end();
	}
);

router.put( "/:id",
            guard.check( "admin" ),
            async (
	            req,
	            res
            ) => {
	            await userRepository.updateUser( req.params.id,
	                                             req.body )
	                                .catch( ( err ) => res.status( 500 )
	                                                      .send( err.message ) );
	            res.status( 204 )
	               .end();
            } );

router.delete( "/:id",
               guard.check( "admin" ),
               async (
	               req,
	               res
               ) => {
	               await userRepository.deleteUser( req.params.id );
	               res.status( 204 )
	                  .end();
               } );

exports.initializeRoutes = () => router;
