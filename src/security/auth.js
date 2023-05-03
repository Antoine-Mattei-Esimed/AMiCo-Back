const { sign } = require( "jsonwebtoken" );

exports.generateAuthToken = ( userId,
                              firstName,
                              isAdmin
) => {
	const permissions = isAdmin
	                    ? [ "admin" ]
	                    : [];
	
	return sign( { userId, firstName, permissions },
	             process.env.JWT_SECRET,
	             { expiresIn : process.env.JWT_EXPIRES_ON } );
};
