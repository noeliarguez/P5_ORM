/* eslint-disable no-invalid-this*/
/* eslint-disable no-undef*/
// IMPORTS
const {assert, expect} = require('chai');
const path = require("path");
const util = require('util');
const Utils = require('../utils/testutils');

process.env.DATABASE_URL = "sqlite:autocorector.sqlite";

let sequelize;

let patientCtrl;
let hospitalCtrl;
let doctorCtrl;

let hospital1;
let hospital2;
let hospital3;

let doctor1;
let doctor2;
let doctor3;

let patient1;
let patient2;
let patient3;
let patient4;
let patient5;


const drop_tables = async function () {
    await sequelize.drop();
}

const check_tables = async function () {
    return await sequelize.getQueryInterface().showAllSchemas();
}

const check_references = async function (table) {
    return await sequelize.getQueryInterface().getForeignKeyReferencesForTable(table);
}

const T_TEST = 2 * 60

// CRITICAL ERRORS
let error_critical = null;

// TESTS
describe("Practica Sequelize CORE", function () {

    this.timeout(T_TEST * 1000);

    it("(Precheck 1) Comprobando que las dependencias están instaladas...", async function () {

        this.score = 0;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            const node_modules = path.resolve(path.join(__dirname, "../../", "node_modules"));

            this.msg_ok = `Encontrado el directorio '${node_modules}'`;
            this.msg_err = `No se encontró el directorio '${node_modules}'`;
            var fileexists;
            try {
                fileexists = await Utils.checkFileExists(node_modules);
                if (!fileexists) {
                    error_critical = this.msg_err;
                }
            } catch (err) {
                error_critical = err;
            }

            fileexists.should.be.equal(true);
        }
    });

    it("(Precheck 2) Comprobando conexión a base de datos data.sqlite3...", async function () {

        this.score = 0;
        this.msg_ok = 'Conexión a la base de datos con éxito';
        this.msg_err = 'Fallo en la conexión a la base de datos';
        try {
            sequelize = require('../../src/models');
            await sequelize.sync({force: true});
            patientCtrl = require('../../src/controllers/patient');
            hospitalCtrl = require('../../src/controllers/hospital');
            doctorCtrl = require('../../src/controllers/doctor');

        } catch (error) {
            console.log(error)
            should.not.exist(error);
        }
    });

    it('(1) Comprobando que se ha creado bien el modelo Hospital', async function () {

        this.score = 0.5;
        this.msg_ok = 'Modelo Hospital creado satisfactoriamente';

        const Hospital = sequelize.models.Hospital;

        this.msg_err = '  Modelo Hospital no incializado correctamente. Compruebe la sintaxis';
        Hospital.should.be.an('function');
        should.exist(Hospital.rawAttributes);

        this.msg_err = '  No se ha indicado modelName al iniciar el modelo Hospital. modelName debe ser "hospitals"'
        let tables = await check_tables()
        let is_table_hospitals = tables.filter(elem => (elem?.name === 'Hospitals'));
        assert.equal(is_table_hospitals.length, 1);

        this.msg_err = '  No se ha incluido el atributo "id" en el modelo Hospital';
        should.exist(Hospital.rawAttributes.id);
        this.msg_err = '  El atributo "id" del modelo Hospital debe ser la clave primaria';
        should.exist(Hospital.rawAttributes.id.primaryKey);
        assert.equal(Hospital.rawAttributes.id.primaryKey, true);
        this.msg_err = '  El atributo "id" del modelo Hospital debe ser tipo INTEGER';
        should.exist(Hospital.rawAttributes.id.type);
        assert.equal(Hospital.rawAttributes.id.type.key, 'INTEGER');
        //this.msg_err = '  El atributo "id" del modelo Hospital debe tener un valor por defecto UUIDV4';
        //should.exist(hospital.rawAttributes.id.defaultValue);
        //assert.equal(hospital.rawAttributes.id.defaultValue.key, 'UUIDV4');

        this.msg_err = '  No se ha incluido el atributo "name" en el modelo Hospital';
        should.exist(Hospital.rawAttributes.name);
        this.msg_err = '  El atributo "name" del modelo Hospital debe ser tipo STRING';
        should.exist(Hospital.rawAttributes.name.type);
        assert.equal(Hospital.rawAttributes.name.type.key, 'STRING');

        this.msg_err = '  No se ha incluido el atributo "city" en el modelo Hospital';
        should.exist(Hospital.rawAttributes.city);
        this.msg_err = '  El atributo "city" del modelo Hospital debe ser tipo STRING';
        should.exist(Hospital.rawAttributes.city.type);
        assert.equal(Hospital.rawAttributes.city.type.key, 'STRING');
    });

    it('(2) Comprobando que se ha creado bien el modelo Patient', async function () {

        this.score = 0.5;
        this.msg_ok = 'Modelo Patient creado satisfactoriamente';
        this.msg_err = '  Fallo al incializar el modelo patient'

        const Patient = sequelize.models.Patient;

        this.msg_err = '  Modelo Patient no incializado correctamente. Compruebe la sintaxis';
        Patient.should.be.an('function');
        should.exist(Patient.rawAttributes);

        this.msg_err = '  No se ha indicado modelName al iniciar el modelo Patient. modelName debe ser "Patients"'
        let tables = await check_tables()
        let is_table_patients = tables.filter(elem => (elem?.name === 'Patients'));
        assert.equal(is_table_patients.length, 1);

        this.msg_err = '  No se ha incluido el atributo "id" en el modelo Patient';
        should.exist(Patient.rawAttributes.id);
        this.msg_err = '  El atributo "id" del modelo Patient debe ser la clave primaria';
        should.exist(Patient.rawAttributes.id.primaryKey);
        assert.equal(Patient.rawAttributes.id.primaryKey, true);
        this.msg_err = '  El atributo "id" del modelo Patient debe ser tipo INTEGER';
        should.exist(Patient.rawAttributes.id.type);
        assert.equal(Patient.rawAttributes.id.type.key, 'INTEGER');
        //this.msg_err = '  El atributo "id" del modelo Patient debe tener un valor por defecto UUIDV4';
        //should.exist(patient.rawAttributes.id.defaultValue);
        //assert.equal(patient.rawAttributes.id.defaultValue.key, 'UUIDV4');

        this.msg_err = '  No se ha incluido el atributo "name" en el modelo Patient';
        should.exist(Patient.rawAttributes.name);
        this.msg_err = '  El atributo "name" del modelo Patient debe ser tipo STRING';
        should.exist(Patient.rawAttributes.name.type);
        assert.equal(Patient.rawAttributes.name.type.key, 'STRING');

        this.msg_err = '  No se ha incluido el atributo "surname" en el modelo Patient';
        should.exist(Patient.rawAttributes.surname);
        this.msg_err = '  El atributo "surname" del modelo Patient debe ser tipo STRING';
        should.exist(Patient.rawAttributes.surname.type);
        assert.equal(Patient.rawAttributes.surname.type.key, 'STRING');

        this.msg_err = '  No se ha incluido el atributo "dni" en el modelo Patient';
        should.exist(Patient.rawAttributes.dni);
        this.msg_err = '  El atributo "dni" del modelo Patient debe ser tipo STRING';
        should.exist(Patient.rawAttributes.dni.type);
        assert.equal(Patient.rawAttributes.dni.type.key, 'STRING');
    });

    it('(3) Comprobando que se ha creado bien el modelo Doctor', async function () {

        this.score = 0.5;
        this.msg_ok = 'Modelo Doctor creado satisfactoriamente';
        this.msg_err = '  Fallo al incializar el modelo doctor'

        const Doctor = sequelize.models.Doctor;

        this.msg_err = '  Modelo Doctor no incializado correctamente. Compruebe la sintaxis';
        Doctor.should.be.an('function');
        should.exist(Doctor.rawAttributes);

        this.msg_err = '  No se ha indicado modelName al iniciar el modelo Doctor. modelName debe ser "Doctors"'
        let tables = await check_tables()
        let is_table_doctors = tables.filter(elem => (elem?.name === 'Doctors'));
        assert.equal(is_table_doctors.length, 1);

        this.msg_err = '  No se ha incluido el atributo "id" en el modelo Doctor';
        should.exist(Doctor.rawAttributes.id);
        this.msg_err = '  El atributo "id" del modelo Doctor debe ser la clave primaria';
        should.exist(Doctor.rawAttributes.id.primaryKey);
        assert.equal(Doctor.rawAttributes.id.primaryKey, true);
        this.msg_err = '  El atributo "id" del modelo Doctor debe ser tipo INTEGER';
        should.exist(Doctor.rawAttributes.id.type);
        assert.equal(Doctor.rawAttributes.id.type.key, 'INTEGER');
        //this.msg_err = '  El atributo "id" del modelo Doctor debe tener un valor por defecto UUIDV4';
        //should.exist(Doctor.rawAttributes.id.defaultValue);
        //assert.equal(Doctor.rawAttributes.id.defaultValue.key, 'UUIDV4');

        this.msg_err = '  No se ha incluido el atributo "name" en el modelo Doctor';
        should.exist(Doctor.rawAttributes.name);
        this.msg_err = '  El atributo "name" del modelo Doctor debe ser tipo STRING';
        should.exist(Doctor.rawAttributes.name.type);
        assert.equal(Doctor.rawAttributes.name.type.key, 'STRING');

        this.msg_err = '  No se ha incluido el atributo "surname" en el modelo Doctor';
        should.exist(Doctor.rawAttributes.surname);
        this.msg_err = '  El atributo "surname" del modelo Doctor debe ser tipo STRING';
        should.exist(Doctor.rawAttributes.surname.type);
        assert.equal(Doctor.rawAttributes.surname.type.key, 'STRING');

        this.msg_err = '  No se ha incluido el atributo "speciality" en el modelo Doctor';
        should.exist(Doctor.rawAttributes.speciality);
        this.msg_err = '  El atributo "speciality" del modelo Doctor debe ser tipo STRING';
        should.exist(Doctor.rawAttributes.speciality.type);
        assert.equal(Doctor.rawAttributes.speciality.type.key, 'STRING');
    });

    it('(4) Comprobando que se han realizado bien las asociacion entre Patient y Hospital', async function () {

        this.score = 0.5;
        this.msg_ok = 'Las asociacion entre Patient y Hospital se ha creado satisfactoriamente';
        this.msg_err = '  La relación entre Patient y Hospital no se ha realizado correctamente. Recuerde que se trata de una asociacion 1:N (Un hospital tiene varios pacientes). Si persiste el error, compruebe que la sintaxis no es correcta.';
        let association_patients = await check_references('Patients');
        let n_1 = association_patients.filter(elem => elem.referencedTableName === 'Hospitals');
        assert.isAtLeast(n_1.length, 1);

        this.msg_err = '  La relación entre Patient y Hospital esta invertida.';
        let association_hospitals = await check_references('Hospitals');
        let n_1_inverted = association_hospitals.filter(elem => elem.referencedTableName === 'Patients');
        assert.equal(n_1_inverted.length, 0);
    });

    it('(5) Comprobando que se han realizado bien la asociacion entre Patient y Doctor', async function () {

        this.score = 0.5;
        this.msg_ok = 'Las asociacion entre entre Patient y Doctor se ha creado satisfactoriamente';

        this.msg_err = '  La relación entre Patient y Doctor no se ha realizado. Si persiste el error, compruebe que la sintaxis no es correcta.';
        let tables = await check_tables()
        let nm_table = tables.filter(elem => (elem?.name !== 'Hospitals' && elem?.name !== 'Patients' && elem?.name !== 'Doctors'));
        assert.isAtLeast(nm_table.length, 1);

        this.msg_err = '  La relación entre Patient y Doctor no se ha realizado correctamente. Recuerde que se trata de una asociacion N:M. Si persiste el error, compruebe que la sintaxis no es correcta.';
        let nm_table_name = nm_table[0].name;
        let association_nm = await check_references(nm_table_name);

        assert.equal(association_nm.length, 2);
        let reference_1 = association_nm.filter(elem => elem.referencedTableName === 'Patients');
        let reference_2 = association_nm.filter(elem => elem.referencedTableName === 'Doctors');
        assert.isAtLeast(reference_1.length, 1);
        assert.isAtLeast(reference_2.length, 1);
    });

    it("(6) Comprobando creacion de hospitales ...", async function () {

        this.score = 0.6;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `create crea un hospital correctamente`;
            this.msg_err = `create no crea un hospital correctamente`;

            hospital1 = await hospitalCtrl.create('La Paz', 'Madrid');
            hospital2 = await hospitalCtrl.create('Universitario', 'Toledo');
            hospital3 = await hospitalCtrl.create('Clínico', 'Madrid');

            const h1 = await sequelize.models.Hospital.findByPk(hospital1.id);
            should.exist(h1);
            should.equal(hospital1?.id, h1?.id);
            should.equal(hospital1?.name, h1?.name);
            should.equal(hospital1?.city, h1?.city);

            const h2 = await sequelize.models.Hospital.findByPk(hospital2.id);
            should.exist(h2);
            should.equal(hospital2?.id, h2?.id);
            should.equal(hospital2?.name, h2?.name);
            should.equal(hospital2?.city, h2?.city);

            const h3 = await sequelize.models.Hospital.findByPk(hospital3.id);
            should.exist(h3);
            should.equal(hospital3?.id, h3?.id);
            should.equal(hospital3?.name, h3?.name);
            should.equal(hospital3?.city, h3?.city);
        }
    });

    it("(7) Comprobando creacion de doctores ...", async function () {

        this.score = 0.6;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `create crea un doctor correctamente`;
            this.msg_err = `create no crea un doctor correctamente`;

            doctor1 = await doctorCtrl.create('Javier', 'Toro', 'Familia');
            doctor2 = await doctorCtrl.create('Carmen', 'Hidalgo', 'Cardiología');
            doctor3 = await doctorCtrl.create('Enrique', 'Rodríguez', 'Pediatría');

            const d1 = await sequelize.models.Doctor.findByPk(doctor1.id);
            should.exist(d1);
            should.equal(doctor1?.id, d1?.id);
            should.equal(doctor1?.name, d1?.name);
            should.equal(doctor1?.surname, d1?.surname);
            should.equal(doctor1?.speciality, d1?.speciality);

            const d2 = await sequelize.models.Doctor.findByPk(doctor2.id);
            should.exist(d2);
            should.equal(doctor2?.id, d2?.id);
            should.equal(doctor2?.name, d2?.name);
            should.equal(doctor2?.surname, d2?.surname);
            should.equal(doctor2?.speciality, d2?.speciality);

            const d3 = await sequelize.models.Doctor.findByPk(doctor3.id);
            should.exist(d3);
            should.equal(doctor3?.id, d3?.id);
            should.equal(doctor3?.name, d3?.name);
            should.equal(doctor3?.surname, d3?.surname);
            should.equal(doctor3?.speciality, d3?.speciality);
        }
    });

    it("(8): Comprobando la creación de pacientes ...", async function () {
        this.score = 0.6;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `create crea un paciente correctamente`;
            this.msg_err = `create no crea un paciente correctamente`;

            patient1 = await patientCtrl.create(hospital1.id, 'Pedro', 'Gómez', '555555');
            patient2 = await patientCtrl.create(hospital1.id, 'Jose', 'Ruíz', '399822');
            patient3 = await patientCtrl.create(hospital1.id, 'Ana', 'García', '111111');
            patient4 = await patientCtrl.create(hospital2.id, 'Pepita', 'Ayuso', '222222');
            patient5 = await patientCtrl.create(hospital3.id, 'Kevin', 'Sánchez', '333333');

            await [patient1, patient2, patient3, patient4, patient5].forEach(async patient => {
                const p = await sequelize.models.Patient.findByPk(patient.id);
                should.exist(p);
                should.equal(patient?.id, p?.id);
                should.equal(patient?.name, p?.name);
                should.equal(patient?.surname, p?.surname);
                should.equal(patient?.surname, p?.dni);
                should.equal(patient?.hospitalId, p?.hospitalId);
            });
        }
    });


    it("(9): Comprobando que read devuelve los datos de pacientes correctamente...", async function () {
        this.score = 0.6;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `read devuelve los datos del paciente correctamente`;
            this.msg_err = `read no devuelve los datos del paciente correctamente`;

            should.exist(patient1);

            await [patient1, patient2, patient3, patient4, patient5].forEach(async patient => {
                const p = await patientCtrl.read(patient.id);
                should.exist(p);
                should.equal(patient?.id, p?.id);
                should.equal(patient?.name, p?.name);
                should.equal(patient?.hospitalId, p?.hospitalId);
            });
        }
    });

    it("(10): Comprobando que update actualiza un paciente correctamente...", async function () {
        this.score = 0.6;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `update actualiza un paciente correctamente`;
            this.msg_err = `update no actualiza un paciente correctamente`;

            const new_name = 'Pablo';
            const new_surname = 'Gomez';
            const new_dni = "666666";
            const target = (await sequelize.models.Patient.findAll())[1]; // Segundo paciente
            await patientCtrl.update(target.id, new_name, new_surname, new_dni); // Actualizarlo
            let patient = await sequelize.models.Patient.findByPk(target.id); // Actualizado

            should.equal(patient?.name, new_name);
            should.equal(patient?.surname, new_surname);
            should.equal(patient?.dni, new_dni);
        }
    });

    it("(11): Comprobando que se asignan bien los doctores a los pacientes...", async function () {
        this.score = 0.6;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `assignDoctor asigna un doctor a un paciente correctamente`;
            this.msg_err = `assignDoctor no asigna un doctor a un paciente correctamente`;

            await doctorCtrl.assignDoctor(patient1.id, doctor1.id);
            await doctorCtrl.assignDoctor(patient2.id, doctor1.id);
            await doctorCtrl.assignDoctor(patient3.id, doctor1.id);
            await doctorCtrl.assignDoctor(patient4.id, doctor1.id);
            await doctorCtrl.assignDoctor(patient5.id, doctor1.id);
            await doctorCtrl.assignDoctor(patient2.id, doctor2.id);
            await doctorCtrl.assignDoctor(patient4.id, doctor2.id);
            await doctorCtrl.assignDoctor(patient1.id, doctor3.id);
            await doctorCtrl.assignDoctor(patient4.id, doctor3.id);
            await doctorCtrl.assignDoctor(patient5.id, doctor3.id);

            let doctors = (await patient1.getDoctors())
                .map(doctor => doctor.id);

            assert.include(doctors, doctor1.id);
            assert.notInclude(doctors, doctor2.id);
            assert.include(doctors, doctor3.id);

            doctors = (await patient2.getDoctors())
                .map(doctor => doctor.id);
            assert.include(doctors, doctor1.id);
            assert.include(doctors, doctor2.id);
            assert.notInclude(doctors, doctor3.id);

            doctors = (await patient5.getDoctors())
                .map(doctor => doctor.id);
            assert.include(doctors, doctor1.id);
            assert.notInclude(doctors, doctor2.id);
            assert.include(doctors, doctor3.id);
        }
    });

    it("(12): Comprobando que se obtiene correctamente el listado de todos los hospitales ...", async function () {
        this.score = 0.7;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `index obtiene el listado de todos los hospitales correctamente`;
            this.msg_err = `index no obtiene el listado de todos los hospitales correctamente`;

            let list = await hospitalCtrl.index();
            let ids = list.map(h => h.id);

            assert.equal(ids.length, 3);
            assert.include(ids, hospital1.id);
            assert.include(ids, hospital2.id);
            assert.include(ids, hospital3.id);
        }
    });

    it("(13): Comprobando que se obtienen correctamente los hospitales de una ciudad...", async function () {
        this.score = 0.7;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `indexByCity obtiene los hospitales de una ciudad correctamente`;
            this.msg_err = `indexByCity no obtiene los hospitales de una ciudad correctamente`;

            let list = await hospitalCtrl.indexByCity("Madrid");
            let ids = list.map(h => h.id);

            assert.equal(ids.length, 2);
            assert.include(ids, hospital1.id);
            assert.notInclude(ids, hospital2.id);
            assert.include(ids, hospital3.id);
        }
    });

    it("(14): Comprobando que se obtienen correctamente los pacientes de un hospital ...", async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `indexByHospital obtiene los pacientes de un hospital correctamente`;
            this.msg_err = `indexByHospital no obtiene los pacientes de un hospital correctamente`;

            let list = await patientCtrl.indexByHospital(hospital1.id);
            let ids = list.map(p => p.id);

            assert.equal(ids.length, 3);
            assert.include(ids, patient1.id);
            assert.include(ids, patient2.id);
            assert.include(ids, patient3.id);
            assert.notInclude(ids, patient4.id);
            assert.notInclude(ids, patient5.id);
        }
    });

    it("(15): Comprobando que se obtienen correctamente los doctores de un paciente ...", async function () {
        this.score = 1;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `indexByPatient obtiene los doctores de un paciente correctamente`;
            this.msg_err = `indexByPatient no obtiene los doctores de un paciente correctamente`;

            let list = await doctorCtrl.indexByPatient(patient2.id);
            let ids = list.map(d => d.id);

            assert.equal(ids.length, 2);
            assert.include(ids, doctor1.id);
            assert.include(ids, doctor2.id);
            assert.notInclude(ids, doctor3.id);
        }
    });


    it("(16): Comprobando que delete borrar un paciente correctamente...", async function () {
        this.score = 0.5;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = `delete borra un paciente correctamente`;
            this.msg_err = `delete no borra un paciente correctamente`;

            const target = (await sequelize.models.Patient.findAll())[1]; // Segundo paciente
            await patientCtrl.delete(target.id);
            const patientDeleted = await sequelize.models.Patient.findByPk(target.id);

            should.equal(patientDeleted, null);
        }
    });


    after('Delete testing database', async function () {
        try {
            await drop_tables();
            console.log('Base de datos de testing borrada satisfactoriamente.');
        } catch (error) {
            console.error('Unable to delete the database.');
        }
    });
});