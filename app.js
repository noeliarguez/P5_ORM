
const sequelize = require('./models');
const patientCtrl = require('./controllers/patient');
const hospitalCtrl = require('./controllers/hospital');
const doctorCtrl = require('./controllers/doctor');

const main = async () => {
    try {

        // Crear 3 Hospitales:
        const hospital1 = await hospitalCtrl.create('La Paz','Madrid');
        const hospital2 = await hospitalCtrl.create('Universitario', 'Toledo');
        const hospital3 = await hospitalCtrl.create('Clínico','Madrid');

        // Crear Doctores
        const doctor1 = await doctorCtrl.create('Javier', 'Toro', 'Familia');
        const doctor2 = await doctorCtrl.create('Carmen', 'Hidalgo', 'Cardiología');
        const doctor3 = await doctorCtrl.create('Enrique', 'Rodríguez', 'Pediatría');

        // Crear Pacientes en hospitales:
        const patient1 = await patientCtrl.create(hospital1.id, 'Pedro', 'Gómez', '555555');
        const patient2 = await patientCtrl.create(hospital1.id, 'Jose', 'Ruíz', '399822');
        const patient3 = await patientCtrl.create(hospital1.id, 'Ana', 'García', '111111');
        const patient4 = await patientCtrl.create(hospital2.id, 'Pepita', 'Ayuso', '222222');
        const patient5 = await patientCtrl.create(hospital3.id, 'Kevin', 'Sánchez', '333333');

        // Asignar todos los pacientes al doctor 1.
        // Asignar los pacientes 2 y 4 al doctor 2.
        // Asignar los pacientes 1, 4 y 5 al doctor 3.
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

        // Listar todos los hospitales.
        console.log("Hospitales: ");
        (await hospitalCtrl.index()).forEach(hospital => {
            console.log(" - " + hospital.name + " en " + hospital.city);
        });

        // Listar todos los hospitales de Madrid.
        console.log("Hospitales de Madrid: ");
        (await hospitalCtrl.indexByCity("Madrid")).forEach(hospital => {
            console.log(" - " + hospital.name + " en " + hospital.city);
        });

        // Ver pacientes del hospital 1:
        console.log(`Pacientes del hospital ${hospital1.name}`);
        (await patientCtrl.indexByHospital(hospital1.id))
            .forEach(patient => console.log(" -", patient.name));

        // Ver nombres de los doctores del paciente 2
        console.log(`Doctores del paciente ${patient2.name}:`);
        (await doctorCtrl.indexByPatient(patient2.id))
            .forEach(doctor => console.log(" -", doctor.name));

        // Cambias datos de un paciente y consultarlos despues
        console.log("Cambiar datos de un paciente:");
        let pbefore = await patientCtrl.read(patient3.id);
        await patientCtrl.update(patient3.id, "Ana María", "Garcillán", "012345");
        let pafter = await patientCtrl.read(patient3.id);
        console.log(` - ${pbefore.name} -> ${pafter.name}`);

    } catch (error) {
        console.log("Error:", error);
    }
}

(async () => {
    await sequelize.sync({force: true});
    console.log('Connected and migrated SQlite3 Database!');
    await main();
})()