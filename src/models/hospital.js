'use strict';

const {Model, DataTypes} = require('sequelize');

// Definition of the Quiz model:
module.exports = sequelize => {

	class Hospital extends Model {}

	// Inicialize el modelo Hospital aqui
	Hospital.init( {
		name: {
			type: DataTypes.STRING
		},
		city: {
			type: DataTypes.STRING
		}
	}, {sequelize}

	);

	return Hospital;
};