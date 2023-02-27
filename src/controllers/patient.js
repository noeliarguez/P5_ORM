const {models} = require('../models');

// Muestra la informacion de un paciente
exports.read = async function (patientId) {
    // Rellene aqui ...
}

// Crea un paciente en un hospital
exports.create = async function (hospitalId, name, surname, dni) {
    // Rellene aqui ...
}

// Actualiza un paciente
exports.update = async function (patientId, name, surname, dni) {
    // Rellene aqui ...
}

// Borra un paciente
exports.delete = async function (patientId) {
    // Rellene aqui ...
}


// Buscar pacientes de un hospital ordenados por el nombre (de la A a la Z)
exports.indexByHospital = async function (hospitalId) {
    // Rellene aqui ...
}
