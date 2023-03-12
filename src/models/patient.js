'use strict';

const {Model, DataTypes} = require('sequelize');

// Definition of the Quiz model:
module.exports = sequelize => {

    class Patient extends Model { }

    // Inicialize el modelo Patient aqui
    Patient.init( {
        name: {
			type: DataTypes.STRING
		},
		surname: {
			type: DataTypes.STRING
		},
        dni: {
            type: DataTypes.STRING
        }
	}, {sequelize}

    )

    return Patient;
};