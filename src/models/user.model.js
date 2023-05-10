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

const { DataTypes } = require( "sequelize" );
const { sequelize } = require( "./db" );

const Utilisateur = sequelize.define(
	"Utilisateur",
	{
		id            : {
			primaryKey   : true,
			type         : DataTypes.UUID,
			defaultValue : DataTypes.UUIDV4
		},
		prenom        : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		nom           : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		password      : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		dateNaissance : {
			type      : DataTypes.DATEONLY,
			allowNull : false
		},
		adresse       : {
			type      : DataTypes.TEXT,
			allowNull : false
		},
		email         : {
			type      : DataTypes.STRING,
			allowNull : false,
			unique    : true
		},
		telephone     : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		caAnnuelMax   : {
			type      : DataTypes.BIGINT,
			allowNull : false
		},
		tauxDeCharge  : {
			type      : DataTypes.INTEGER,
			allowNull : false
		}
	},
	{ tableName : "Utilisateur" }
);

module.exports = Utilisateur;

