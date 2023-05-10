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

const express = require( "express" );
const router = express.Router();
const userRepository = require( "../models/user-repository" );
const { validateBody } = require( "./validation/route.validator" );
const { body } = require( "express-validator" );

router.post(
	"/",
	body( "adresseComplete" )
		.isString()
		.notEmpty(),
	body( "caAnnuelMax" )
		.isInt()
		.notEmpty(),
	body( "dateNaissance" )
		.isDate()
		.notEmpty(),
	body( "email" )
		.isEmail()
		.notEmpty(),
	body( "motDePasse" )
		.isString()
		.notEmpty()
		.isLength( { min : 8 } ),
	body( "nom" )
		.isString()
		.notEmpty(),
	body( "prenom" )
		.isString()
		.notEmpty(),
	body( "telephone" )
		.isString()
		.notEmpty(),
	body( "tauxDeCharge" )
		.isInt()
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
		
		req.body.password = req.body.motDePasse;
		req.body.motDePasse = "";
		req.body.adresse = req.body.adresseComplete;
		req.body.adresseComplete = "";
		
		await userRepository.createUser( req.body );
		res.status( 201 )
		   .send( {
			          "success" : true
		          } );
	}
);

exports.initializeRoutes = () => router;
