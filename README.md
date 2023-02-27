<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">


<br/>


# Entrega 5 ORM

Versión: 27 de Febrero de 2023

## 1. Objetivo

- Aprender a desarrollar operaciones CRUD (Create, Read, Update and Delete) a través de un ORM.
- Aprender a desarrollar operaciones de consulta (queries) a través de un ORM..
- Afianzar las ventajas de usar ORMs en el desarrollo de aplicaciones.

## 2. Dependencias

Para realizar la práctica el alumno deberá tener instalado en su ordenador:
- Herramienta GIT para gestión de repositorios [Github](https://git-scm.com/downloads)
- Entorno de ejecución de javascript [NodeJS](https://nodejs.org/es/download/) versión 18.

## 3. Descripción de la práctica

La práctica simula una aplicación de gestión de pacientes  utilizando el ORM **Sequelize** para poder 
gestionar los datos de la aplicación en una base de datos **SQLite**.

El siguiente modelo relacional sirve de guía para identificar los modelos y relaciones definidas:

<kbd>
<img src="https://user-images.githubusercontent.com/716928/221199177-ac307a79-4877-472f-81a4-c057d1eacbea.png" alt="Diagrama Entidad Relación" width="350"/>
</kbd>

En esta práctica se va a desarrollar un programa de ejemplo **src/app.js** que se ejecuta con el comando

```
node src/app.js
```

El fichero **src/app.js** contiene el programa principal y se usa solamente para probar 
las funciones que el alumno tiene que desarrollar en los ficheros controladores
del directorio **src/controllers**.

El programa usa tres modelos: **Doctor**, **Hospital** y **Patient**.
El alumno debe definir estos modelos y las relaciones entre ellos, completando los
ficheros que se proporcionan en la carpeta **src/models**.
Entre los doctores y pacientes hay que definir una relación M-a-N.
Entre los hospitales y pacientes hay que definir una relación 1-a-N.

Los controladores que ejecutan las acciones sobre los modelos se implementan
en los ficheros **src/controllers/patient.js**, **src/controllers/hospital.js** y **src/controllers/doctor.js**.
El alumno debe codificar las funciones propuestas para estos controladores
para que las acciones que se realizan en **src/app.js** funcionen correctamente. 
Para ello, desarrollará las operaciones correspondientes con Sequelize implementando las operaciones
CRUD sobre los objetos patiente, hospital y doctor, así como otra serie de queries.


## 4. Descargar el código del proyecto

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#descargar-el-c%C3%B3digo-del-proyecto).



## 5. Tareas a realizar

El alumno deberá completar los siguientes ficheros:

- **src/models/patient.js**, **src/models/doctor.js**, **src/models/hospital.js**.
El alumno debe completar estos ficheros con la definición los modelos 
de acuerdo al esquema relacional aportado.

- **src/models/index.js**.
El alumno debe completar este fichero para inicializar un objeto **sequelize**
con la BBDD a usar, importar las definiones de los modelos, y
definir las relaciones siguientes:
  - Relación 1-a-N entre Hospital y Paciente.
  - Relación N-a-M entre Paciente y Doctor.

- **src/controllers/patient.js**, **src/controllers/hospital.js** y **src/controllers/doctor.js**.
Contienen las funciones que deberá completar el alumno. 
Se debe usar el ORM **Sequelize** para 
realizar todas las operaciones relacionadas con la base de datos y devolver un resultado de la operación.

**NOTA**: recuerde que las peticiones a las bases de datos son asíncronas, por lo que
los métodos que ejecutan deben ser asíncronos (como puede observar en la cabecera 
de los mismos), y por tanto, las operaciones con Sequelize deben ir precedidas 
del término **await**. Por ejemplo, 
`const pacientes = await Pacient.findAll()` guardaría en la variable
`pacientes` el resultado de ejecutar la operación `findAll()` 
del modelo Pacient definido con Sequelize.

### 5.1 Funciones del controlador de pacientes

Las funciones que debe completar el alumno en el controlador **src/controllers/patient.js**
son las siguientes:



>### read(patientId)
>**Descripción:**
>- Busca los datos de un paciente.
>
>**Parámetros:**
>- patientId - id del paciente a buscar.
>
>**Returns:**
>- Un objeto paciente.



> ### create(hospitalId, name, surname, dni)
> **Descripción:**
> - Crea un paciente dentro de un hospital.
> **Parámetros:**
> - 
> - hospitalId - id del hospital que se asociara con el paciente creado.
> - name - Nombre del paciente.
> - surname - Apellido del paciente.
> - dni - DNI del paciente.
> - 
> **Returns:**
> - El objeto paciente creado.


> ### update(patientId, name, surname, dni)
> **Descripción:**
> - Actualiza los datos del paciente identificado por patientId.
> 
> **Parámetros:**
> - patientId - id del paciente.
> - name - Nuevo nombre del paciente.
> - surname - Nuevo apellido del paciente.
> - dni - Nuevo DNI del paciente.
> 
> **Returns:**
> - El objeto paciente actualizado.



> ### delete(patientId)
> **Descripción:**
> - Borra un paciente de la base de datos.
> 
> **Parámetros:**
> - patientId - Id del paciente.
> 
> **Returns:**
> - El resultado de la operación de borrado.



> ### indexByHospital(hospitalId)
> **Descripción:**
> - Busca todos los pacientes de un hospital, los ordena por su nombre
>
> **Parámetros:**
> - hospitalId - clave primaria (id) del hospital.
>
> **Returns:**
> - Un array de pacientes, ordenados por nombre.


### 5.2 Funciones del controlador de hospitales

Las funciones que debe completar el alumno en el controlador **src/controllers/hospital.js**
son las siguientes:

> ### create(name, city)
> **Descripción:**
> - Crea un nuevo hospital.
> 
> **Parámetros:**
> - name - nombre del hospital.
> - city - ciudad donde está el hospital.
> 
> **Returns:**
> - El objeto hospital creado,



> ### index()
> **Descripción:**
> - Busca todos los hospitales almacenados en al BBDD.
> 
> **Returns:**
> - Un array de hospitales.



> ### indexByCity(city)
> **Descripción:**
> - Busca todos los hospitales situados en la ciudad indicada.
> 
> **Parámetros:**
> - city - ciudad donde buscar los hospitales.
> 
> **Returns:**
> - Un array de hospitales.




### 5.3 Funciones del controlador de doctores

Las funciones que debe completar el alumno en el controlador **src/controllers/doctor.js**
son las siguientes:


> ### create(name, surname, speciality)
> **Descripción:**
> - Crea un doctor.
> 
> **Parámetros:**
> - name - Nombre del doctor.
> - surname - Apellido del doctor.
> - speciality - especialidad del doctor.
> 
> **Returns:**
> - El objeto doctor creado.


> ### assignDoctor(patientId, doctorId)
> **Descripción:**
> - Añade una relacion ente un doctor y un paciente, es decir, 
> se registra a un doctor como doctor de un paciente.
> 
> **Parámetros:**
> - patientId - clave primaria (id) del paciente.
> - doctorId - clave primaria (id) del doctor.
> 
> **Returns:**
> - El objeto paciente.



> ### indexByPatient(patientId)
> **Descripción:**
> - Busca todos los doctores de un paciente.
>
> **Parámetros:**
> - patientId - clave primaria (id) del paciente.
>
> **Returns:**
> - Un array de doctoresd.


### 5.4 Usar sqlite3

En muy recomendable usar un cliente SQLite
para verificar que la estructura de las tablas creadas y que los datos
guardados en ellas con correctos.

Puede usar el cliente que prefiera: **sqlite3**, **Liya**, **SQLiteStudio**, ...

Veamos cómo se puede hacer usando el cliente **sqlite3**.

Abrir un terminal e iniciar el cliente de **sqlite3** ejecutando:

```
sqlite3
```

Aparecerá un prompt para indicar que ya pueden introducirse órdenes.

Para conectarse desde a la base de datos se debe usar el
comando **.open** indicando la ruta en donde se encuentra el fichero **p5.slite**
(normalmente se encuentra en la carpeta raíz del proyecto). Por ejemplo:

```
.open /la_ruta_hasta_el_directorio_de_trabajo/P5_ORM/p5.sqlite3
```

Tambíén se puede lanzar el programa **sqlite3** pasando como argumento el path al fichero de la base de datos.

El comando para listar las tablas que se han creado es:

```
.tables
```

Para mostrar la estructura de las tablas, ejecute el comando:

```
.schema 
```

Para mostrar los registros guardados de las tablas, ejecute los comandos:

```
select * from Hospitals; 
select * from Doctors; 
select * from Patients; 
```

El alumno debe verificar que se han creado las tablas con la estructura solicitada
y adjuntar una captura de pantalla con el resultado.


## 6. Pruebas con el autocorector

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#pruebas-con-el-autocorector).

## 7. Pruebas manuales y capturas de pantalla

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#pruebas-manuales-y-capturas-de-pantalla).

Capturas a entregar con esta práctica:

- Captura 1: Captura del terminal ejecutando `node app.js`:

<kbd>
<img src="https://user-images.githubusercontent.com/716928/220897249-d5a5532a-9e59-43a0-8417-802e77c82d1b.png" alt="node app.js" width="250"/>
</kbd>

- Captura 2: Captura de varios clientes SQLite mostrando información de la BBDD:

<kbd>
<img src="https://user-images.githubusercontent.com/716928/220897677-cc56b2db-37ec-46b6-9758-5daaf05b1d66.png" alt="sqlite3" width="250"/>
</kbd>


<kbd>
<img src="https://user-images.githubusercontent.com/716928/220897631-12fedd7b-6f6f-415c-8c6b-a61cf41b8a93.png" alt="liya" width="250"/>
</kbd>


## 8. Instrucciones para la Entrega y Evaluación.

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#instrucciones-para-la-entrega-y-evaluaci%C3%B3n
).

## 9. Rúbrica

El autocorector probará todas las funciones desarrolladas por el alumno, y asignará una nota parcial a cada una de ellas.

La nota de la entrega será la suma de todas las notas parciales.


