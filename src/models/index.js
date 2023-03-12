const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || "sqlite:p5.sqlite";

const sequelize = new Sequelize(url, {loggind: true});   


// Import Models
const Patient = require('./patient')(sequelize, Sequelize.DataTypes);
const Hospital = require('./hospital')(sequelize, Sequelize.DataTypes);
const Doctor = require('./doctor')(sequelize, Sequelize.DataTypes);

// Relationships

// Relationship between Hospital and Patient (1:N)
Hospital.masMany(Patient, {as: 'patient', foreignKey: 'hospitalId'});
Patient.belongsTo(Hospital, {as: 'hospital', foreignKey: 'hospitalId'});

//Relationship between Doctor and Patient (N:M)
Doctor.belongsToMany(Patient, {through: 'Doctor_Patients'});
Patient.belongsToMany(Doctor, {through: 'Doctor_Patients'});

module.exports = exports = sequelize;
